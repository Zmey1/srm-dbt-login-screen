import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        console.log('Received login request:', body);
        const isValid = await this.authService.validateUser(body.username, body.password);
        console.log('Validation result:', isValid);
        return { success: isValid };
    }

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        return this.authService.registerUser(body.username, body.password);
    }

}
