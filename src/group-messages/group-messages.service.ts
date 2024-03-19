import { Injectable } from '@nestjs/common';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { GroupMessage } from './entities/group-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupMessagesService {

  constructor(@InjectRepository(GroupMessage) private groupMessageRepository:Repository<GroupMessage>){
  }

  async create(createGroupMessageDto: CreateGroupMessageDto) {
    const groupMessageCreated = this.groupMessageRepository.create(createGroupMessageDto);
    await this.groupMessageRepository.save(groupMessageCreated);

    return groupMessageCreated;
  }

  findAll() {
    return this.groupMessageRepository.find();
  }

  findOne(id: number) {
    return this.groupMessageRepository.findOneBy({id});
  }

  async update(id: number, updateGroupMessageDto: UpdateGroupMessageDto) {
    await this.groupMessageRepository.update(id, updateGroupMessageDto);
    return updateGroupMessageDto;
  }

  async remove(id: number) {
    await this.groupMessageRepository.delete(id);
    return `This action removes a #${id} message`;
  }
}
