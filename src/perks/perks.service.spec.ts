import { Test, TestingModule } from '@nestjs/testing';
import { PerksService } from './perks.service';

describe('PerksService', () => {
  let service: PerksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerksService],
    }).compile();

    service = module.get<PerksService>(PerksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
