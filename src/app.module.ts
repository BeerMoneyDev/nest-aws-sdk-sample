import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { S3ManagerModule } from './s3-manager/s3-manager.module';

@Module({
  imports: [
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        useValue: {
          credentials: new SharedIniFileCredentials({
            profile: 'kerryritter',
          }),
        },
      },
    }),
    S3ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
