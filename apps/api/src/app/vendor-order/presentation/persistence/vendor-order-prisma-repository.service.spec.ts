import { Test, TestingModule } from '@nestjs/testing';
import { VendorOrderPrismaRepositoryService } from './vendor-order-prisma-repository.service';

describe('VendorOrderPrismaRepositoryService', () => {
  let service: VendorOrderPrismaRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorOrderPrismaRepositoryService],
    }).compile();

    service = module.get<VendorOrderPrismaRepositoryService>(
      VendorOrderPrismaRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
