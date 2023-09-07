import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  ANALYTICS_PACKAGE_NAME,
  BALANCE_SERVICE_NAME,
} from '../analytics/analytics.pb';
import { CardModule } from '../card/card.module';
import { PromotionModule } from '../promotion/promotion.module';
import { UserModule } from '../user/user.module';
import { BalanceController } from './balance.controller';
import { Balance } from './balance.entity';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BALANCE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ANALYTICS_SERVICE_URL,
          package: ANALYTICS_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@fidecly/grpc-proto/proto/analytics/analytics.proto',
          ),
        },
      },
    ]),
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
