import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resource/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}

    async signIn(account: string, pass: string): Promise<any> {

        const salt = await bcrypt.genSalt();
        // pass = await bcrypt.hash( pass , 10)
        let user = await this.userService.findByUserAccount(account);
        if( ! await bcrypt.compare( pass , user?.password ) ) {
            throw new UnauthorizedException()
        }
        
        const payload = { 
            sub: user.id, 
            username: user.username,
            account: user.account,
            // password: user.password,
            // email: user.email,
            // phone: user.phone,
            create_at: user.create_at,
            update_at: user.update_at,
        }
        
        const access_token = await this.jwtService.signAsync(payload);

        if( (await this.userService.updateToken( user.id , access_token )).token != access_token ) {
            throw new UnauthorizedException();
        }

        return {
            access_token
        }

        // const { password , ...result } = user;
        // return result;
    }
}
