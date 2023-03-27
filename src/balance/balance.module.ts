import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from '../card/card.module';
import { PromotionModule } from '../promotion/promotion.module';
import { BalanceController } from './balance.controller';
import { Balance } from './balance.entity';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Balance]),
    forwardRef(() => PromotionModule),
    forwardRef(() => CardModule),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
