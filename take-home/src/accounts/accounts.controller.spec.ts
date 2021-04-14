import {AccountsController} from './accounts.controller';
import {AccountsService} from './accounts.service';
import {Account} from './entities/acount.entity';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(() => {
    service = new AccountsService(null);
    controller = new AccountsController(service);
  });


  describe('findAll', () => {
    it('should return an array of accounts', async () => {
      const result = [new Account()];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  })
});
