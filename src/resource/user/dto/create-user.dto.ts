import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsIn, IsNotEmpty, isStrongPassword, MinLength, MaxLength, isEmail, IsEmail, IsPhoneNumber } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'The user username',
        minimum: 1,
        maximum: 32,
        default: "username",
    })
    @MinLength(1)
    @MaxLength(32)
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The user account',
        minimum: 4,
        maximum: 32,
        default: "account",
    })
    @MinLength(4)
    @MaxLength(32)
    @IsNotEmpty()
    @IsString()
    account: string;

    @ApiProperty({
        description: 'The user password',
        minimum: 6,
        maximum: 64,
        default: "password",
    })
    @MinLength(6)
    @MaxLength(64)
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty({
        description: 'The user email',
        minimum: 9,
        maximum: 256,
        default: "test@gmail.com",
    })
    @MinLength(9)
    @MaxLength(256)
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'The user phone',
        minimum: 9,
        maximum: 32,
        default: "0912345678",
    })
    @MinLength(9)
    @MaxLength(256)
    @IsString()
    phone: string;
}
