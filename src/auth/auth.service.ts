import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLoginDto } from './dto/user-login.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { exclude } from '@common/common/utils/exclude';
import { UserLogin } from './entities/user-login.entity';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(userLoginDto: UserLoginDto): Promise<UserLogin> {
    //find user by username
    const user = await this.prisma.user.findUnique({
      where: {
        username: userLoginDto.username,
      },
    });
    //if user not found
    if (!user || !user.password) {
      throw new ForbiddenException('User not found');
    }
    //if user found
    //compare password
    const isPasswordMatched = await argon.verify(
      user.password,
      userLoginDto.password,
    );
    //if password not matched
    if (!isPasswordMatched) {
      throw new ForbiddenException('Password not matched');
    }
    //if password matched

    //delete password
    const userWithoutPassword = exclude(user, ['password']);
    //return user
    const token = await this.sign(user);
    return { ...userWithoutPassword, token };
  }

  async me(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      //if user not found
      if (!user) {
        throw new ForbiddenException('User not found');
      }

      //delete password
      const userWithoutPassword = exclude(user, ['password']);
      //return user

      return userWithoutPassword;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  sign(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      secret: secret,
    });
  }
}
