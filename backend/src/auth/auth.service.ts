import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async validateUser(username: string, password: string): Promise<boolean> {
        const user = await this.userRepo.findOneBy({ username, password });
        return !!user;
    }

    async registerUser(username: string, password: string): Promise<{ success: boolean; message?: string }> {
        const existing = await this.userRepo.findOneBy({ username });
        if (existing) {
            return { success: false, message: 'Username already taken' };
        }

        const newUser = this.userRepo.create({ username, password });
        await this.userRepo.save(newUser);
        return { success: true };
    }

}
