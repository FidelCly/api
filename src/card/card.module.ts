import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CARD_SERVICE_NAME } from '../analytics/analytics.pb';
import { ANALYTICS_PACKAGE_NAME } from '../analytics/shop.pb';

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
            'node_modules/@fidecly/grpc-proto/proto/analytics/analytics.proto',
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
