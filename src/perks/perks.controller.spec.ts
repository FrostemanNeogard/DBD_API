import { Test, TestingModule } from '@nestjs/testing';
import { PerksController } from './perks.controller';
import { PerksService } from './perks.service';

describe('PerksController', () => {
  let controller: PerksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerksController],
      providers: [PerksService],
    }).compile();

    controller = module.get<PerksController>(PerksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
