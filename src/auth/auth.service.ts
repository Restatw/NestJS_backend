import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if(user?.password !== pass) {
            throw new UnauthorizedException()
        }

        const payload = { 
            sub: user.id, 
            username: user.username,
            age: user.age,
            password: user.password
        }

        return {
            access_token : await this.jwtService.signAsync(payload)
        }

        // const { password , ...result } = user;
        // return result;
    }
}
