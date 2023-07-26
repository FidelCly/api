import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AbilityFactory, Action } from '../auth/ability.factory';
import { AuthGuard } from '../auth/auth.guard';
import { CampaignService } from '../campaign/campaign.service';
import { CardService } from '../card/card.service';
import { PromotionService } from '../promotion/promotion.service';
import { CreateShopDto, ShopFilterOptions, UpdateShopDto } from './shop.dto';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Controller('shop')
@UseGuards(AuthGuard)
export class ShopController {
  constructor(
    private service: ShopService,
    private cardService: CardService,
    private promotionService: PromotionService,
    private campaignService: CampaignService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get()
  async all(@Query() query: ShopFilterOptions, @Req() req: Request) {
    const lat = +query.lat;
    const long = +query.long;
    const distance = +query.distance;
    const activity = query.activity;
    const active = Boolean(query.isActive);

    let shops = await this.service.all();

    if (active) {
      shops = shops.filter((shop: Shop) => {
        return shop.isActive;
      });
    }

    // Filter by activity
    if (activity) {
      shops = shops.filter((shop: Shop) => {
        return shop.activity.toLowerCase() === activity.toLowerCase();
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

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    shops.forEach((shop) => {
      if (!ability.can(Action.Read, shop)) throw new ForbiddenException();
    });

    return shops;
  }

  @Get(':id')
  async one(@Param('id') id: string, @Req() req: Request) {
    const shop = await this.service.findOne(+id);
    if (!shop) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, shop)) throw new ForbiddenException();

    return shop;
  }

  @Get(':id/promotions')
  async promotions(@Param('id') id: string, @Req() req: Request) {
    const shop = await this.service.findOnePromotions(+id);
    if (!shop) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, shop)) throw new ForbiddenException();

    return shop.promotions;
  }

  @Get(':id/cards')
  async cards(@Param('id') id: string, @Req() req: Request) {
    const shop = await this.service.findOneClients(+id);
    if (!shop) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, shop)) throw new ForbiddenException();

    return shop.cards;
  }

  @Get(':id/campaigns')
  async campaigns(@Param('id') id: string, @Req() req: Request) {
    const shop = await this.service.findOneCampaigns(+id);
    if (!shop) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, shop)) throw new ForbiddenException();

    return shop.campaigns;
  }

  @Post()
  async create(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
    if (await this.service.findOnebyUserId(req['currentUser'].id))
      throw new ConflictException('User already has shop');

    if (await this.service.findOneByEmail(createShopDto.email))
      throw new ConflictException('Email already in use');

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Create, Shop)) throw new ForbiddenException();

    const shop = await this.service.create(
      createShopDto,
      req['currentUser'].id,
    );

    await this.service.sendToAnalytics(shop);
    return shop;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
    @Req() req: Request,
  ) {
    const shop = await this.service.findOne(+id);
    if (!shop) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, shop)) throw new ForbiddenException();

    await this.service.update(+id, updateShopDto);
    await this.service.sendToAnalytics({
      ...shop,
      ...updateShopDto,
    });

    return { message: 'Shop updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const shop = await this.service.findOne(+id);
    if (!shop) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Delete, shop)) throw new ForbiddenException();

    await this.cardService.removeShopsCards(+id);
    await this.promotionService.removeShopsPromotions(+id);
    await this.campaignService.removeShopsCampaigns(+id);

    await this.service.remove(+id);
    return { message: 'Shop deleted' };
  }
}
