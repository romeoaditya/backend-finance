import { Injectable, UnauthorizedException } from
'@nestjs/common';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {email: loginDto.email },

        });
        
        if (!user) {
            throw new UnauthorizedException('Email tidak ditemukan');
        }

        const passwordValid = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!passwordValid) {
            throw new UnauthorizedException('password salah');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };
        
        return {
            access_token: this.jwtService.sign(payload, {
  secret: process.env.JWT_SECRET,
}),
            user: {
            id: user.id,
            email: user.email,
            },
        };
    }
}