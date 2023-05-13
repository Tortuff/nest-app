import { Test, TestingModule } from '@nestjs/testing';
import { SubdomainController } from './subdomain.controller';

describe('SubdomainController', () => {
  let controller: SubdomainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdomainController],
    }).compile();

    controller = module.get<SubdomainController>(SubdomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
