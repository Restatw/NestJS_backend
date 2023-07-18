import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    // const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash( createUserDto.password , 10)
    return await this.userRepository.save(createUserDto)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({where:{id}})
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({where:{username}})
  }
  

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where:{id}});
    user.age = updateUserDto.age;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    const { password, ...userEntity } = await this.userRepository.save(user);
    return userEntity;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where:{id}});
    return this.userRepository.remove(user);
  }
}
