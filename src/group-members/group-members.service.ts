import { Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import { GroupMember } from './entities/group-member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupMembersService {

  constructor(@InjectRepository(GroupMember) private groupMemberRepository:Repository<GroupMember>){
  }

  async create(createGroupMemberDto: CreateGroupMemberDto) {
    const groupMemberCreated = this.groupMemberRepository.create(createGroupMemberDto);
    await this.groupMemberRepository.save(groupMemberCreated);

    return groupMemberCreated;
  }

  findAll() {
    return this.groupMemberRepository.find();
  }

  findOne(groupId: number, memberId: number) {
    return this.groupMemberRepository.findOneBy({ groupId, memberId });
  }

  /*update(id: number, updateGroupMemberDto: UpdateGroupMemberDto) {
    return `This action updates a #${id} groupMember`;
  }*/

  async remove(groupId: number, memberId: number) {
    await this.groupMemberRepository.delete({ groupId: groupId, memberId: memberId });
    return `This action removes #${memberId} member from #${groupId} group`;
  }
}
