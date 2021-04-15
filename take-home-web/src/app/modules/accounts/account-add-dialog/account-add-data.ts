export class AccountAddData {
  url: string;
  message: string;
  redirect: boolean;

  constructor(options: Partial<AccountAddData> = {}) {
    this.url = options.url;
    this.message = options.message;
    this.redirect = options.redirect;
  }
}
