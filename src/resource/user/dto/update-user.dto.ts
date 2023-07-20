import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: 'The account user name',
        minimum: 4,
        maximum: 32,
        default: "username",
    })
    @MinLength(4)
    @MaxLength(32)
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The account user password',
        minimum: 8,
        maximum: 64,
        default: "password",
    })
    @MinLength(8)
    @MaxLength(64)
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The account user email',
        minimum: 3,
        maximum: 256,
        default: "email",
    })
    @MinLength(3)
    @MaxLength(256)
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'The account user phone',
        minimum: 3,
        maximum: 256,
        default: "0912345678",
    })
    @MinLength(3)
    @MaxLength(256)
    @IsPhoneNumber()
    phone: string;
}
