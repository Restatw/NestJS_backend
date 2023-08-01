import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/resource/user/user.service';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (private jwtService: JwtService, private reflector: Reflector,private userService: UserService) {  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if( isPublic ) {
      return true;
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request);
    let currentUser = null;
    if( !token ) {
      throw new ApiException("test.exception.auth.token_invalid",ApiErrorCode.TOKEN_INVALID);
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      )
      
      request['user'] = payload;

      currentUser = await this.userService.findByUserAccount(payload.account);
    } 
    catch {
      throw new ApiException("test.exception.auth.token_invalid",ApiErrorCode.TOKEN_INVALID);
    }
        
    // 認證失效被覆蓋
    // 如果可以多重登入這邊需要取消
    if ( currentUser.token != token ) {
      throw new ApiException("test.exception.auth.has_login_from_other_device",ApiErrorCode.TOKEN_INVALID);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
