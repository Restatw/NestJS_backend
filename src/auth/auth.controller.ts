import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { AuthGuard, Public } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() data: SignInUserDto) {
        return this.authService.signIn(data.username,data.password)
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
