import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { AnalyticsController } from './analytics.controller';
import { ANALYTICS_PACKAGE_NAME, ANALYTICS_SERVICE_NAME } from './analytics.pb';
import { AnalyticsService } from './analytics.service';

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
            'node_modules/@fidecly/grpc-proto/proto/analytics/analytics.proto',
          ),
        },
      },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
