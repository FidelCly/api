import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from '../card/card.module';
import { PromotionModule } from '../promotion/promotion.module';
import { BalanceController } from './balance.controller';
import { Balance } from './balance.entity';
import { BalanceService } from './balance.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Balance]),
    forwardRef(() => PromotionModule),
    forwardRef(() => CardModule),
    forwardRef(() => UserModule),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
