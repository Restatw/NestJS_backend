import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsIn } from "class-validator";

export class SignInUserDto {
    
    @ApiProperty({
        description: 'The account user name',
        minimum: 4,
        default: "account",
    })
    @IsString()
    account: string;

    @ApiProperty({
        description: 'The account user password',
        minimum: 8,
        default: "password",
    })
    @IsString()
    password: string;

}
