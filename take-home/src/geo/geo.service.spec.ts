import {Test, TestingModule} from '@nestjs/testing';
import {GeoService} from './apartments.service';

describe('ApartmentsService', () => {
  let service: GeoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoService],
    }).compile();

    service = module.get<GeoService>(GeoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
