import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ShopService } from '../shop/shop.service';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { PromotionService } from './promotion.service';
import { AbilityFactory, Action } from '../auth/ability.factory';
import { Promotion } from './promotion.entity';
import { CampaignService } from '../campaign/campaign.service';

@Controller('promotion')
@UseGuards(AuthGuard)
export class PromotionController {
  constructor(
    private service: PromotionService,
    private shopService: ShopService,
    private campaignService: CampaignService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get(':id')
  async one(@Param('id') id: string, @Req() req: Request) {
    const promotion = await this.service.findOne(+id);
    if (!promotion) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, promotion)) throw new ForbiddenException();

    return promotion;
  }

  @Post()
  async create(
    @Body() createPromotionDto: CreatePromotionDto,
    @Req() req: Request,
  ) {
    if (!(await this.shopService.findOne(req['currentUser'].shop.id))) {
      throw new NotFoundException('Shop not found');
    }

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Create, Promotion)) throw new ForbiddenException();

    return this.service.create(createPromotionDto, req['currentUser'].shop.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
    @Req() req: Request,
  ) {
    const promotion = await this.service.findOne(+id);
    if (!promotion) {
      throw new NotFoundException();
    }

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, promotion)) throw new ForbiddenException();

    await this.service.update(+id, updatePromotionDto);
    return { message: 'Promotion updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const promotion = await this.service.findOne(+id);
    if (!promotion) {
      throw new NotFoundException();
    }

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Delete, promotion)) throw new ForbiddenException();

    await this.campaignService.removeShopsCampaigns(+id);
    await this.service.remove(+id);
    return { message: 'Promotion deleted' };
  }
}
