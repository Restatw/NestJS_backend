import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resource/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<any> {

        const salt = await bcrypt.genSalt();
        // pass = await bcrypt.hash( pass , 10)
        const user = await this.userService.findByUsername(username);
        if( ! await bcrypt.compare( pass , user?.password ) ) {
            throw new UnauthorizedException()
        }
        
        const payload = { 
            sub: user.id, 
            username: user.username,
            // password: user.password,
            age: user.age,

        }

        const access_token = await this.jwtService.signAsync(payload);

        // user.sid = access_token;

        return {
            access_token
        }

        // const { password , ...result } = user;
        // return result;
    }
}
