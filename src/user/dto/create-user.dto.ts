import { IsString, IsInt, IsIn } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsInt()
    age: number;
}
