import { Module } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3ManagerService } from './s3-manager.service';
import { S3ManagerController } from './s3-manager.controller';

@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  providers: [S3ManagerService],
  controllers: [S3ManagerController],
})
export class S3ManagerModule {}
