import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { S3ManagerModule } from './s3-manager/s3-manager.module';

@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: () => {
          if (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) {
            return {};
          } 
          return {
            credentials: new SharedIniFileCredentials({
              profile: 'personal',
            }),
          };
        }
      },
    }),
    S3ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
