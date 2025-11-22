import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);

    try {
      return await this.usersRepository.save(newUser);
    } catch (err: any) {
   
      if (err.code === 'SQLITE_CONSTRAINT') {
        if (err.message.includes('username')) {
          throw new BadRequestException('Username is taken');
        }
        if (err.message.includes('email')) {
          throw new BadRequestException('Email is taken');
        }
      }
      throw err;
    }
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
