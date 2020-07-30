import { Test, TestingModule } from '@nestjs/testing';
import { createAwsServiceMock, createAwsServicePromisableSpy, getAwsServiceMock } from 'nest-aws-sdk/dist/testing';
import { S3ManagerService } from './s3-manager.service';
import { S3 } from 'aws-sdk';

describe('S3ManagerService', () => {
  let service: S3ManagerService;
  
  let s3: S3;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3ManagerService,
        createAwsServiceMock(S3, {
          useValue: {
            listObjectsV2: () => null,
          }
        }),
      ],
    }).compile();

    service = module.get(S3ManagerService);
    s3 = getAwsServiceMock(module, S3);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listBucketContents()', () => {
    it('should call the list method and return the Content keys', async () => {
      const listSpy = createAwsServicePromisableSpy(
        s3,
        'listObjectsV2',
        'resolve',
        {
          Contents: [
            {
              Key: 'myKey',
            },
          ],
        },
      );

      const result = await service.listBucketContents('myBucket');

      expect(result.length).toBe(1);
      expect(result[0]).toBe('myKey');
      expect(listSpy).toHaveBeenCalledTimes(1);
      expect(listSpy).toHaveBeenCalledWith({ Bucket: 'myBucket' });
    });
  })
});
