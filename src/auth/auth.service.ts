import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto';
import { JwtPayload, RJwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    throw new Error('Method not implemented.');
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    throw new Error('Method not implemented.');
  }

  async logout(userId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    throw new Error('Method not implemented.');
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getTokens(
    userId: number,
    userName: string,
    permissions: string[],
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      uname: userName,
      perm: permissions,
    };
    const rJwtPayload: RJwtPayload = {
      id: userId,
      unname: userName,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(rJwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
