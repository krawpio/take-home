export class MessageData {
  message: string;
  cssClass: string;


  constructor(options: Partial<MessageData> = {}) {
    this.message = options.message;
    this.cssClass = options.cssClass;
  }
}



