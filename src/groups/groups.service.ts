import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {

  constructor(@InjectRepository(Group) private groupRepository:Repository<Group>){
  }

  async create(createGroupDto: CreateGroupDto) {
    const groupCreated = this.groupRepository.create(createGroupDto);
    await this.groupRepository.save(groupCreated);

    return groupCreated;
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: number) {
    return this.groupRepository.findOneBy({id});
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    await this.groupRepository.update(id, updateGroupDto);
    return updateGroupDto;
  }

  async remove(id: number) {
    await this.groupRepository.delete(id);
    return `This action removes a #${id} group`;
  }
}
