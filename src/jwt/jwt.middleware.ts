import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  /**
   * 토큰 만료 체크
   * @param time 토큰 만료 시간
   */
  private checkIsTokenExpired(time) {
    const now = new Date().getTime();
    if (now >= time) {
      return true;
    }
    return false;
  }

  async use(req: any, res: any, next: () => void) {
    if ('token' in req.headers) {
      const token = req.headers['token'] as string;
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (
          typeof decoded === 'object' &&
          decoded.hasOwnProeperty('id') &&
          decoded.hasOwnProeperty('expiredTime')
        ) {
          const { id, expiredTime } = decoded;
          if (!this.checkIsTokenExpired(expiredTime)) {
            const { user, ok } = await this.usersService.findById(id);
            if (ok) {
              req['user'] = user;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    next();
  }
}
