import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {

  constructor(@InjectRepository(Message) private messageRepository:Repository<Message>){
  }
  
  async create(createMessageDto: CreateMessageDto) {
    const messageCreated = this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(messageCreated);

    return messageCreated;
  }

  findAll() {
    return this.messageRepository.find();
  }

  findOne(id: number) {
    return this.messageRepository.findOneBy({id});
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.messageRepository.update(id, updateMessageDto);
    return updateMessageDto;
  }

  async remove(id: number) {
    await this.messageRepository.delete(id);
    return `This action removes a #${id} message`;
  }
}
