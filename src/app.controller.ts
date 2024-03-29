import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CheckoutDto } from './app.dto';
import { AbilityFactory, Action } from './auth/ability.factory';
import { AuthGuard } from './auth/auth.guard';
import { Balance } from './balance/balance.entity';
import { BalanceService } from './balance/balance.service';
import { Card } from './card/card.entity';
import { CardService } from './card/card.service';
import { Promotion } from './promotion/promotion.entity';
import { PromotionService } from './promotion/promotion.service';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(
    private cardService: CardService,
    private balanceService: BalanceService,
    private promotionService: PromotionService,
    private userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Put('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto, @Req() req: Request) {
    const ability = this.abilityFactory.defineAbility(req['currentUser']);

    // Check if user exists
    const user: User = await this.userService.findByUuid(checkoutDto.uuid);
    if (!user) throw new NotFoundException();

    // Check if promotion exists
    const promotion: Promotion = await this.promotionService.findOne(
      +checkoutDto.promotionId,
    );
    if (!promotion) throw new NotFoundException();

    // Check if promotion has expired
    if (
      promotion.isActive &&
      (new Date(promotion.startAt).getTime() > new Date().getTime() ||
        new Date(promotion.endAt).getTime() < new Date().getTime())
    ) {
      if (!ability.can(Action.Update, promotion))
        throw new ForbiddenException();

      promotion.isActive = false;
      // If expired, set to inactive
      await this.promotionService.update(+checkoutDto.promotionId, {
        isActive: false,
      });
    }

    // Check if promotion should be activated
    if (
      !promotion.isActive &&
      new Date(promotion.startAt).getTime() < new Date().getTime() &&
      new Date(promotion.endAt).getTime() > new Date().getTime()
    ) {
      if (!ability.can(Action.Update, promotion))
        throw new ForbiddenException();

      promotion.isActive = true;
      // If expired, set to inactive
      await this.promotionService.update(+checkoutDto.promotionId, {
        isActive: true,
      });
    }

    // Check if a card exists for this user
    const card: Card = await this.cardService.findOneBy({
      userId: +user.id,
      shopId: +req['currentUser'].shop.id,
    });
    if (!card) throw new NotFoundException();

    // Check if an active balance already exists for this promotion
    let balance: Balance = await this.balanceService.findOneBy({
      promotionId: +checkoutDto.promotionId,
      cardId: +card.id,
      isActive: true,
    });

    if (!balance && promotion.isActive) {
      // Create balance if it doesn't exist yet
      if (!ability.can(Action.Create, Balance)) throw new ForbiddenException();
      balance = await this.balanceService.create({
        promotionId: +checkoutDto.promotionId,
        cardId: card.id,
        counter: 1,
      });

      // Send to analytics
      await this.balanceService.sendToAnalytics(balance);

      return { message: 'Balance updated' };
    }

    // Check if promotion is active
    if (!promotion.isActive) {
      if (balance)
        // Set balance to inactive if promotion isn't
        await this.balanceService.update(+balance.id, { isActive: false });
      throw new ForbiddenException('Promotion is not active');
    }

    if (!ability.can(Action.Update, balance)) throw new ForbiddenException();

    // Check if balance is at checkout limit
    if (balance.counter + 1 === promotion.checkoutLimit) {
      // Transition balance to inactive
      // At next checkout, a new balance will be created
      await this.balanceService.update(+balance.id, {
        counter: promotion.checkoutLimit,
        isActive: false,
      });

      // Send data to analytics
      await this.balanceService.sendToAnalytics({
        ...balance,
        counter: promotion.checkoutLimit,
        isActive: false,
      });
      return { message: 'Promotion limit reached' };
    }

    // Update balance
    await this.balanceService.update(+balance.id, {
      counter: balance.counter + 1,
    });

    // Send to analytics

    await this.balanceService.sendToAnalytics({
      ...balance,
      counter: balance.counter + 1,
    });

    return { message: 'Balance updated' };
  }
}
