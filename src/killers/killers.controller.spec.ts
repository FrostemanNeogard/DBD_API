import { Test, TestingModule } from '@nestjs/testing';
import { KillersController } from './killers.controller';
import { KillersService } from './killers.service';

describe('KillersController', () => {
  let controller: KillersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KillersController],
      providers: [KillersService],
    }).compile();

    controller = module.get<KillersController>(KillersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
