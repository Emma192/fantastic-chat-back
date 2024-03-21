import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
         ) {}
    
    async register({userName, email, password}: RegisterDto){
        
        const user = await this.userService.findOneByEmail(email);

        if(user){
            throw new BadRequestException('Email alredy exists')
        }
        return await this.userService.create({
            userName,
            email,
            password: await bcrypt.hash(password, 10)
        });
    }
    
    async login({ email, password }: LoginDto){
        const user = await this.userService.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException('Wrong Email')
        }

        const isPassValid = await bcrypt.compare(password, user.password);

        if(!isPassValid){
            throw new UnauthorizedException('Wrong password')
        }
        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);
    
        return {
            token,
            email,
        };
    }
}