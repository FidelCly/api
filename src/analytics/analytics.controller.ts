import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { AnalyticsOptions } from './analytics.dto';
import { AnalyticsService } from './analytics.service';
import {
  GetAffluenceResponse,
  GetClientsCountResponse,
  GetPromotionCheckoutsCountResponse,
  GetPromotionsRankingResponse,
} from './general.pb';
import { ExceptionInterceptor } from '../exception.interceptor';

@Controller('analytics')
@UseGuards(AuthGuard)
@UseInterceptors(ExceptionInterceptor)
export class AnalyticsController {
  @Inject(AnalyticsService)
  private readonly service: AnalyticsService;

  @Get('affluence')
  async affluence(
    @Query() query: AnalyticsOptions,
    @Req() req: Request,
  ): Promise<GetAffluenceResponse> {
    if (!req['currentUser'].shop)
      throw new NotFoundException('Shop not found for this user.');

    return this.service.affluence({
      shopId: req['currentUser'].shop.id,
      startDate: query.start_date,
      endDate: query.end_date,
    });
  }

  @Get('clients-count')
  async clientsCount(
    @Query() query: AnalyticsOptions,
    @Req() req: Request,
  ): Promise<GetClientsCountResponse> {
    if (!req['currentUser'].shop)
      throw new NotFoundException('Shop not found for this user.');

    return this.service.clientsCount({
      shopId: req['currentUser'].shop.id,
      startDate: query.start_date,
      endDate: query.end_date,
    });
  }

  @Get('promotions-ranking')
  async promotionsRanking(
    @Query() query: AnalyticsOptions,
    @Req() req: Request,
  ): Promise<GetPromotionsRankingResponse> {
    if (!req['currentUser'].shop)
      throw new NotFoundException('Shop not found for this user.');

    return this.service.promotionsRanking({
      shopId: req['currentUser'].shop.id,
      startDate: query.start_date,
      endDate: query.end_date,
    });
  }

  @Get('promotion-checkout-count/:id')
  async promotionCheckoutsCount(
    @Param('id') id: string,
    @Query() query: AnalyticsOptions,
    @Req() req: Request,
  ): Promise<GetPromotionCheckoutsCountResponse> {
    if (!req['currentUser'].shop)
      throw new NotFoundException('Shop not found for this user.');

    return this.service.promotionCheckoutsCount({
      shopId: req['currentUser'].shop.id,
      promotionId: +id,
      startDate: query.start_date,
      endDate: query.end_date,
    });
  }
}
