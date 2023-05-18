import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SendRequest } from './campaign.pb';
import { CampaignService } from './campaign.service';

@Controller('promotion')
export class CampaignController {
  @Inject(CampaignService)
  private readonly service: CampaignService;

  @Post()
  private async register(@Body() body: SendRequest) {
    return this.service.send(body);
  }
}
