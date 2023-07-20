import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AbilityFactory, Action } from './auth/ability.factory';
import { AuthGuard } from './auth/auth.guard';
import { CardService } from './card/card.service';
import { PromotionService } from './promotion/promotion.service';
import { Balance } from './balance/balance.entity';
import { Card } from './card/card.entity';
import { Promotion } from './promotion/promotion.entity';
import { CheckoutDto } from './app.dto';
import { BalanceService } from './balance/balance.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

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
    let balance: Balance, promotion: Promotion, card: Card, user: User;
    const ability = this.abilityFactory.defineAbility(req['currentUser']);

    // Check if user exists
    if (!(user = await this.userService.findByUuid(checkoutDto.uuid)))
      throw new NotFoundException();

    // Check if promotion exists
    if (
      !(promotion = await this.promotionService.findOne(
        +checkoutDto.promotionId,
      ))
    )
      throw new NotFoundException();

    // Check if promotion has expired
    if (new Date(promotion.endAt).getTime() < new Date().getTime()) {
      if (!ability.can(Action.Update, promotion))
        throw new ForbiddenException();

      promotion.isActive = false;
      // If expired, set to inactive
      await this.promotionService.update(+checkoutDto.promotionId, {
        isActive: false,
      });
    }

    // Check if a card exists for this user
    if (
      !(card = await this.cardService.findOneBy({
        userId: +user.id,
        shopId: +req['currentUser'].shop.id,
      }))
    )
      throw new NotFoundException();

    // Check if an active balance already exists for this promotion
    if (
      !(balance = await this.balanceService.findOneBy({
        promotionId: +checkoutDto.promotionId,
        cardId: +card.id,
        isActive: true,
      })) &&
      promotion.isActive
    ) {
      // Create balance if it doesn't exist yet
      if (!ability.can(Action.Create, Balance)) throw new ForbiddenException();
      balance = await this.balanceService.create({
        promotionId: +checkoutDto.promotionId,
        cardId: card.id,
        counter: 1,
      });
      // Send to analytics
      this.balanceService.sendToAnalytics(balance);
      return { message: 'Balance updated' };
    }

    // Check if promotion is active
    if (!promotion.isActive) {
      if (balance)
        // Set balance to inactive if promotion isn't
        await this.balanceService.update(+balance.id, { isActive: false });
      throw new ForbiddenException('Promotion is not active');
    }

    if (!ability.can(Action.Update, balance))
      throw new ForbiddenException('here');

    // Check if balance is at checkout limit
    if (balance.counter + 1 === promotion.checkoutLimit) {
      // Transition balance to inactive
      // At next checkout, a new balance will be created
      await this.balanceService.update(+balance.id, {
        counter: promotion.checkoutLimit,
        isActive: false,
      });

      // Send data to analytics
      this.balanceService.sendToAnalytics({
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
    this.balanceService.sendToAnalytics({
      ...balance,
      counter: balance.counter + 1,
    });
    return { message: 'Balance updated' };
  }
}
