import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ShopService } from '../shop/shop.service';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { PromotionService } from './promotion.service';

@Controller('promotion')
@UseGuards(AuthGuard)
export class PromotionController {
  constructor(
    private service: PromotionService,
    private shopService: ShopService,
  ) {}

  @Get(':id')
  async one(@Param('id') id: string) {
    const promotion = await this.service.findOne(+id);
    if (!promotion) throw new NotFoundException();
    return promotion;
  }

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    if (!(await this.shopService.findOne(createPromotionDto.shopId))) {
      throw new NotFoundException('Shop not found');
    }

    return this.service.create(createPromotionDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.service.update(+id, updatePromotionDto);
    return { message: 'Promotion updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.service.remove(+id);
    return { message: 'Promotion deleted' };
  }
}
