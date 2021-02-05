import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  sign(payload: Record<string, any>) {
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string): string | Record<string, any> {
    return jwt.verify(token, this.options.privateKey);
  }
}
