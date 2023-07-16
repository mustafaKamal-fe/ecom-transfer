import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/getuser.decorator';

import { UserLoginDto } from './dto/user-login.dto';
import { JwtGuard } from './guard/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  me(@GetUser('id') userId: number) {
    return this.authService.me(+userId);
  }
}
