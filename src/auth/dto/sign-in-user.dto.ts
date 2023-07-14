import { IsString, IsInt, IsIn } from "class-validator";

export class SignInUserDto {
    
    @IsString()
    username: string;

    @IsString()
    password: string;

}
