import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import {
  CreateCampaignDto,
  SendCampaignDto,
  UpdateCampaignDto,
} from './campaign.dto';
import { ExceptionInterceptor } from '../exception.interceptor';
import { SendRequest } from './campaign.pb';
import { AuthGuard } from '../auth/auth.guard';
import { Campaign } from './campaign.entity';
import { AbilityFactory, Action } from '../auth/ability.factory';
import { Card } from '../card/card.entity';
import { Request } from 'express';

@Controller('campaign')
@UseGuards(AuthGuard)
@UseInterceptors(ExceptionInterceptor)
export class CampaignController {
  constructor(
    private service: CampaignService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get(':id')
  async one(@Param('id') id: string, @Req() req: Request) {
    const campaign = await this.service.findOne(+id);
    if (!campaign) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, campaign)) throw new ForbiddenException();

    return campaign;
  }

  @Post()
  private async create(@Body() body: CreateCampaignDto, @Req() req: Request) {
    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Create, Campaign)) throw new ForbiddenException();

    return this.service.create(body, req['currentUser'].shop.id);
  }

  @Post('/send')
  @HttpCode(200)
  private async send(@Body() body: SendCampaignDto, @Req() req: Request) {
    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    let campaign: Campaign;
    const recipientList: string[] = [];

    if (
      !req['currentUser'].shop.cards ||
      req['currentUser'].shop.cards.length == 0
    )
      throw new BadRequestException("Shop doesn't have any clients");

    req['currentUser'].shop.cards.forEach((card: Card) => {
      recipientList.push(card.user.email);
    });

    // If campaign already exists
    if (body.id) {
      campaign = await this.service.findOne(+body.id);
      if (!campaign) throw new NotFoundException();
      if (!ability.can(Action.Read, campaign)) throw new ForbiddenException();
    } else {
      // Create campaign if it does not exist yet
      if (!ability.can(Action.Create, Campaign)) throw new ForbiddenException();
      campaign = await this.service.create(
        { ...body, subject: body.subject },
        req['currentUser'].shop.id,
      );
    }

    const data: SendRequest = {
      ...campaign,
      recipients: recipientList,
      senderEmail: req['currentUser'].shop.marketingEmail,
    };

    console.log(data);

    return this.service.send(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
    @Req() req: Request,
  ) {
    const campaign = await this.service.findOne(+id);
    if (!campaign) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, campaign)) throw new ForbiddenException();

    await this.service.update(+id, updateCampaignDto);
    return { message: 'Campaign updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const campaign = await this.service.findOne(+id);
    if (!campaign) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Delete, campaign)) throw new ForbiddenException();

    await this.service.remove(+id);
    return { message: 'Campaign deleted' };
  }
}
