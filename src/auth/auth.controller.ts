import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { getUser } from './decorators/getuser.decorator';

import { UserLoginDto } from './dto/user-login.dto';
import { JwtGuard } from './guard/jwt.guard';
import { UserLogin } from './entities/user-login.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userLoginDto: UserLoginDto): Promise<UserLogin> {
    return this.authService.login(userLoginDto);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  me(@getUser('id') userId: number) {
    return this.authService.me(+userId);
  }
}
