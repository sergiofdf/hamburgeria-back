import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/user-from-jwt';
import { UserPayload } from '../models/user-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: payload.roles,
    };
  }
}
