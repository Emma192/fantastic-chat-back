import { Module } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessagesController } from './group-messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessage } from './entities/group-message.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GroupMessage])],
  controllers: [GroupMessagesController],
  providers: [GroupMessagesService],
})
export class GroupMessagesModule {}
