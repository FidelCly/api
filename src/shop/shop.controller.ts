import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PromotionService } from '../promotion/promotion.service';
import { CardService } from '../card/card.service';
import { CreateShopDto, ShopFilterOptions, UpdateShopDto } from './shop.dto';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('shop')
@UseGuards(AuthGuard)
export class ShopController {
  constructor(
    private service: ShopService,
    private cardService: CardService,
    private promotionService: PromotionService,
  ) {}

  @Get()
  async all(@Query() query: ShopFilterOptions) {
    const lat = +query.lat;
    const long = +query.long;
    const distance = +query.distance;
    const active = Boolean(query.isActive);

    let shops = await this.service.all();

    if (active) {
      shops = shops.filter((shop: Shop) => {
        return shop.isActive;
      });
    }

    // Return shops located in defined area
    if (distance && lat && long) {
      shops = shops.filter((shop: Shop) => {
        return (
          this.service.getDistance(+shop.lat, +shop.long, lat, long) < distance
        );
      });
    }

    return shops;
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    const shop = await this.service.findOne(+id);
    if (!shop) throw new NotFoundException();
    return shop;
  }

  @Get(':id/promotions')
  async promotions(@Param('id') id: string) {
    const shop = await this.service.findOnePromotions(+id);
    if (!shop) throw new NotFoundException();
    return shop.promotions;
  }

  @Get(':id/clients')
  async clients(@Param('id') id: string) {
    const shop = await this.service.findOneClients(+id);
    if (!shop) throw new NotFoundException();
    return shop.cards;
  }

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    if (await this.service.findOneByEmail(createShopDto.email)) {
      throw new ConflictException('Email already in use');
    }

    return this.service.create(createShopDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.service.update(+id, updateShopDto);
    return { message: 'Shop updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.cardService.removeShopsCards(+id);
    await this.promotionService.removeShopsPromotions(+id);

    await this.service.remove(+id);
    return { message: 'Shop deleted' };
  }
}
