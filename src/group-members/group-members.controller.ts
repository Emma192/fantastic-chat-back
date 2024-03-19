import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get()
  findAll() {
    return this.groupMembersService.findAll();
  }

  @Get(':groupId/:memberId')
  findOne(@Param('groupId') groupId: string, @Param('memberId') memberId: string) {
    return this.groupMembersService.findOne(+groupId, +memberId);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMemberDto: UpdateGroupMemberDto) {
    return this.groupMembersService.update(+id, updateGroupMemberDto);
  }*/

  @Delete(':groupId/:memberId')
  remove(@Param('groupId') groupId: string, @Param('memberId') memberId: string) {
    return this.groupMembersService.remove(+groupId, +memberId);
  }
}
