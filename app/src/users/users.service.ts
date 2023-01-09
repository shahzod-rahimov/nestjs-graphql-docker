import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    return await this.userRepository.save({ ...createUserInput });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.findOne(updateUserInput.id);
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
    return id;
  }
}
