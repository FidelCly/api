import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ANALYTICS_SERVICE_NAME,
  AnalyticsServiceClient,
  GetAffluenceRequest,
  GetAffluenceResponse,
  GetClientsCountRequest,
  GetClientsCountResponse,
  GetPromotionCheckoutsCountRequest,
  GetPromotionCheckoutsCountResponse,
  GetPromotionsRankingRequest,
  GetPromotionsRankingResponse,
} from './analytics.pb';

@Injectable()
export class AnalyticsService {
  private svc: AnalyticsServiceClient;

  @Inject(ANALYTICS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AnalyticsServiceClient>(
      ANALYTICS_SERVICE_NAME,
    );
  }

  public async affluence(
    request: GetAffluenceRequest,
  ): Promise<GetAffluenceResponse> {
    return firstValueFrom(this.svc.getAffluence(request));
  }

  public async promotionCheckoutsCount(
    request: GetPromotionCheckoutsCountRequest,
  ): Promise<GetPromotionCheckoutsCountResponse> {
    return firstValueFrom(this.svc.getPromotionCheckoutsCount(request));
  }

  public async clientsCount(
    request: GetClientsCountRequest,
  ): Promise<GetClientsCountResponse> {
    return firstValueFrom(this.svc.getClientsCount(request));
  }

  public async promotionsRanking(
    request: GetPromotionsRankingRequest,
  ): Promise<GetPromotionsRankingResponse> {
    return firstValueFrom(this.svc.getPromotionsRanking(request));
  }
}
