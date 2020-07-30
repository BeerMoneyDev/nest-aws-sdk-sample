import { Controller, Get } from '@nestjs/common';
import { S3ManagerService } from './s3-manager.service';

@Controller('s3-manager')
export class S3ManagerController {
  constructor(
    private readonly s3Manager: S3ManagerService,
  ) {}

  @Get()
  async listBucketContents() {
    return await this.s3Manager.listBucketContents('kerryritter-test-bucket');
  }
}
