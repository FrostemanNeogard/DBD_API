import { BadGatewayException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): BadGatewayException {
    return this.appService.getIndex();
  }
}
