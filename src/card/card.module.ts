import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  ANALYTICS_PACKAGE_NAME,
  CARD_SERVICE_NAME,
} from '../analytics/analytics.pb';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import {
  ANALYTICS_PACKAGE_NAME,
  CARD_SERVICE_NAME,
} from '../analytics/card.pb';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CARD_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ANALYTICS_SERVICE_URL,
          package: ANALYTICS_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@fidecly/grpc-proto/proto/analytics/card.proto',
          ),
        },
      },
    ]),
    TypeOrmModule.forFeature([Card]),
    forwardRef(() => ShopModule),
    forwardRef(() => UserModule),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
