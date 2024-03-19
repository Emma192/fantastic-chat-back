import { Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from './entities/friendship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendshipsService {

  constructor(@InjectRepository(Friendship) private friendshipRepository:Repository<Friendship>){
  }
  
  async create(createFriendshipDto: CreateFriendshipDto) {   
    const friendshipCreated = this.friendshipRepository.create(createFriendshipDto);
    await this.friendshipRepository.save(friendshipCreated);

    return friendshipCreated;
  }

  findAll() {
    return this.friendshipRepository.find();
  }

  findOne(id: number) {
    return this.friendshipRepository.findOneBy({id});
  }

  async update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    await this.friendshipRepository.update(id, updateFriendshipDto);
    return updateFriendshipDto;
  }

  async remove(id: number) {
    await this.friendshipRepository.delete(id);
    return `This action removes a #${id} friendship`;
  }
}
