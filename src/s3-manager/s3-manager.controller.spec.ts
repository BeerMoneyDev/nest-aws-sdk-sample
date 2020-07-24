import { Test, TestingModule } from '@nestjs/testing';
import { S3ManagerController } from './s3-manager.controller';
import { S3ManagerService } from './s3-manager.service';

describe('S3Manager Controller', () => {
  let controller: S3ManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3ManagerController],
      providers: [
        { 
          provide: S3ManagerService,
          useValue: {
            listBucketContents: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    controller = module.get<S3ManagerController>(S3ManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
