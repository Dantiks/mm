import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../models/users.models';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { SALT } from '../../../constants';
import { SignUp } from './dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async create(dto: SignUp): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, SALT);
    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await user.generateToken();
    await user.save();
    return user;
  }

  async delete(id: number) {
    const user = await this.usersRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }
    await user.destroy();
    return { message: `Пользователь с id ${id} успешно удалён` };
  }

  async getAll() {
    return await this.usersRepository.findAll({ include: { all: true } });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getById(id: number) {
    const result = await this.usersRepository.findByPk(id);
    if (!result) {
      throw new NotFoundException('Пользователь с данным ID не найден');
    }
    return result;
  }

  async findByToken(token: string) {
    return await this.usersRepository.findOne({ where: { token } });
  }
}
