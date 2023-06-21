import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './campaign.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  CAMPAIGN_SERVICE_NAME,
  CampaignServiceClient,
  SendRequest,
  SendResponse,
} from './campaign.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateCampaignDto, UpdateCampaignDto } from './campaign.dto';

@Injectable()
export class CampaignService {
  private svc: CampaignServiceClient;

  @Inject(CAMPAIGN_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Campaign)
  private repository: Repository<Campaign>;

  public onModuleInit(): void {
    this.svc = this.client.getService<CampaignServiceClient>(
      CAMPAIGN_SERVICE_NAME,
    );
  }

  public async send(sendRequest: SendRequest): Promise<SendResponse> {
    return firstValueFrom(this.svc.send(sendRequest));
  }

  findOne(id: number): Promise<Campaign | null> {
    return this.repository.findOneBy({ id });
  }

  create(
    createCampaignDto: CreateCampaignDto,
    shopId: number,
  ): Promise<Campaign> {
    const campaign = {
      ...new Campaign(),
      ...createCampaignDto,
      message: createCampaignDto.htmlData ?? createCampaignDto.textData,
      shopId: shopId,
    };
    return this.repository.save(campaign);
  }

  update(
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<UpdateResult> {
    return this.repository.update(id, updateCampaignDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  removeShopsCampaigns(shopId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ shopId: shopId });
  }

  removePromotionsCampaigns(promotionId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ promotionId: promotionId });
  }
}
