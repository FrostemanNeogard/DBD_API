import { Test, TestingModule } from '@nestjs/testing';
import { KillersService } from './killers.service';

describe('KillersService', () => {
  let service: KillersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KillersService],
    }).compile();

    service = module.get<KillersService>(KillersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
