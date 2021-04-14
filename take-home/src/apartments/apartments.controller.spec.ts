import {ApartmentsController} from './apartments.controller';
import {ApartmentsService} from './apartments.service';
import {Apartment} from './entities/apartment.entity';

describe('ApartmentsController', () => {
  let controller: ApartmentsController;
  let service: ApartmentsService;

  beforeEach(() => {
    service = new ApartmentsService(null);
    controller = new ApartmentsController(service);
  });


  describe('findAll', () => {
    it('should return an array of apartments', async () => {
      const result = [new Apartment()];
      jest.spyOn(service, 'findAll').mockImplementation(async (options) => result);

    });
  })
});
