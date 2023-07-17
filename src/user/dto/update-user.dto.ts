import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    
    @ApiProperty({
        description: 'The account user name',
        minimum: 4,
        default: "username",
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The account user password',
        minimum: 8,
        default: "password",
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The account user age',
        default: 18,
    })
    @IsInt()
    age: number;

}
