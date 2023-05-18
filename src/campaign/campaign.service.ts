import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './campaign.entity';
import { Repository } from 'typeorm';
import {
  CAMPAIGN_SERVICE_NAME,
  CampaignServiceClient,
  SendRequest,
  SendResponse,
} from './campaign.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
}
