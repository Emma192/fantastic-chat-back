import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>){
  }

  async create(createUserDto: CreateUserDto) {

    const userCreated = this.userRepository.create(createUserDto);
    await this.userRepository.save(userCreated);

    return userCreated;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return updateUserDto;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return `This action removes a #${id} user`;
  }
}
