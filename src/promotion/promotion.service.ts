import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { Promotion } from './promotion.entity';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PromotionServiceClient,
  PROMOTION_SERVICE_NAME,
} from '../analytics/analytics.pb';

@Injectable()
export class PromotionService {
  @InjectRepository(Promotion)
  private repository: Repository<Promotion>;

  private analyticsService: PromotionServiceClient;

  @Inject(PROMOTION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.analyticsService = this.client.getService<PromotionServiceClient>(
      PROMOTION_SERVICE_NAME,
    );
  }

  // DATABASE MANIPULATION

  findOne(id: number): Promise<Promotion | null> {
    return this.repository.findOneBy({ id });
  }

  create(
    createPromotionDto: CreatePromotionDto,
    shopId: number,
  ): Promise<Promotion> {
    const promotion = {
      ...new Promotion(),
      ...createPromotionDto,
      shopId: shopId,
    };
    return this.repository.save(promotion);
  }

  update(
    id: number,
    updatePromotionDto: UpdatePromotionDto,
  ): Promise<UpdateResult> {
    return this.repository.update(id, updatePromotionDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  // CASCADE DELETION

  removeShopsPromotions(shopId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ shopId: shopId });
  }

  // ANALYTICS

  sendToAnalytics(promotion: Promotion) {
    this.analyticsService.send({
      ...promotion,
      startAt: new Date(promotion.startAt).toISOString(),
      endAt: new Date(promotion.endAt).toISOString(),
    });
  }
}
