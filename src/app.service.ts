import { BadGatewayException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): BadGatewayException {
    throw new BadGatewayException();
  }
}
