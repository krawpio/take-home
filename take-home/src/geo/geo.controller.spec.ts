import {GeoController} from './geo.controller';
import {GeoService} from './geo.service';

describe('ApartmentsController', () => {
  let controller: GeoController;
  let service: GeoService;

  beforeEach(() => {
    service = new GeoService(null);
    controller = new GeoController(service);
  });


  describe('findAll', () => {
    it('should return an array of apartments', async () => {
      expect(true).toBe(true);
    });
  })
});
