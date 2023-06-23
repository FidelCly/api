import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ANALYTICS_PACKAGE_NAME } from '../analytics/balance.pb';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { ANALYTICS_SERVICE_NAME } from './general.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ANALYTICS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ANALYTICS_SERVICE_URL,
          package: ANALYTICS_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@fidecly/grpc-proto/proto/analytics/general.proto',
          ),
        },
      },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
