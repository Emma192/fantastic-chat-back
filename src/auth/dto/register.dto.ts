import { IsEmail, IsString, isString } from "class-validator";
import { Transform} from "class-transformer";

export class RegisterDto{

    @IsString()
    userName: string;
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    password: string;
}