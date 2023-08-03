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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AbilityFactory, Action } from '../auth/ability.factory';
import { AuthGuard } from '../auth/auth.guard';
import { ShopService } from '../shop/shop.service';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { Card } from './card.entity';
import { CardService } from './card.service';

@Controller('card')
@UseGuards(AuthGuard)
export class CardController {
  constructor(
    private service: CardService,
    private shopService: ShopService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get(':id')
  async one(@Param('id') id: string, @Req() req: Request) {
    const card = await this.service.findOne(+id);
    if (!card) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, card)) throw new ForbiddenException();

    return card;
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Req() req: Request) {
    if (!(await this.shopService.findOne(createCardDto.shopId))) {
      throw new NotFoundException('Shop not found');
    }

    if (
      await this.service.findOneBy({
        shopId: createCardDto.shopId,
        userId: req['currentUser'].id,
      })
    ) {
      throw new ConflictException('Card already exists');
    }

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Create, Card)) throw new ForbiddenException();

    const card = await this.service.create(
      createCardDto,
      createCardDto.userId ?? req['currentUser'].id,
    );

    await this.service.sendToAnalytics(card);

    return card;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req: Request,
  ) {
    const card = await this.service.findOne(+id);
    if (!card) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, card)) throw new ForbiddenException();

    await this.service.update(+id, updateCardDto);
    this.service.sendToAnalytics({ ...card, ...updateCardDto });
    return { message: 'Card updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const card = await this.service.findOne(+id);
    if (!card) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Delete, card)) throw new ForbiddenException();

    await this.service.remove(+id);
    return { message: 'Card deleted' };
  }
}
