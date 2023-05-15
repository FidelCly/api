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
import { AuthGuard } from '../auth/auth.guard';
import { CardService } from '../card/card.service';
import { Promotion } from '../promotion/promotion.entity';
import { PromotionService } from '../promotion/promotion.service';
import { CreateBalanceDto, UpdateBalanceDto } from './balance.dto';
import { Balance } from './balance.entity';
import { BalanceService } from './balance.service';
import { AbilityFactory, Action } from '../auth/ability.factory';

@Controller('balance')
@UseGuards(AuthGuard)
export class BalanceController {
  constructor(
    private service: BalanceService,
    private promotionService: PromotionService,
    private cardService: CardService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get(':id')
  async one(@Param('id') id: string, @Req() req: Request) {
    const balance = await this.service.findOne(+id);
    if (!balance) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, balance)) throw new ForbiddenException();

    return balance;
  }

  @Post()
  async create(
    @Body() createBalanceDto: CreateBalanceDto,
    @Req() req: Request,
  ) {
    if (!(await this.promotionService.findOne(createBalanceDto.promotionId)))
      throw new NotFoundException('Balance not found');

    if (!(await this.cardService.findOne(createBalanceDto.cardId)))
      throw new NotFoundException('Card not found');

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Create, Balance)) throw new ForbiddenException();

    return this.service.create(createBalanceDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBalanceDto: UpdateBalanceDto,
    @Req() req: Request,
  ) {
    const balance = await this.service.findOne(+id);
    if (!balance) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, balance)) throw new ForbiddenException();

    await this.service.update(+id, updateBalanceDto);
    return { message: 'Balance updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const balance = await this.service.findOne(+id);
    if (!balance) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Delete, balance)) throw new ForbiddenException();

    await this.service.remove(+id);
    return { message: 'Balance deleted' };
  }

  @Put(':id/checkout')
  async checkout(@Param('id') id: string, @Req() req: Request) {
    let balance: Balance, promotion: Promotion;

    if (!(balance = await this.service.findOne(+id)))
      throw new NotFoundException();

    if (!(promotion = await this.promotionService.findOne(balance.promotionId)))
      throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, balance)) throw new ForbiddenException();

    if (!promotion.isActive) {
      await this.service.update(+id, { isActive: false });
      throw new ForbiddenException('Promotion is not active');
    }

    if (new Date(promotion.endAt).getTime() < new Date().getTime()) {
      await this.service.update(+id, { isActive: false });
      throw new ForbiddenException('Promotion has expired');
    }

    if (balance.counter === promotion.checkoutLimit) {
      await this.service.update(+id, { counter: 1, isActive: true });
      return { message: 'Balance updated' };
    }

    if (balance.counter++ === promotion.checkoutLimit) {
      await this.service.update(+id, {
        counter: promotion.checkoutLimit,
        isActive: false,
      });
      return { message: 'Promotion limit reached' };
    }

    await this.service.update(+id, { counter: balance.counter++ });
    return { message: 'Balance updated' };
  }
}
