import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendshipDto } from './create-friendship.dto';
import { IsEnum } from 'class-validator';
import { Status } from '../enums/status.enum';

export class UpdateFriendshipDto extends PartialType(CreateFriendshipDto) {
    @IsEnum(Status)
    status: Status = Status.ACCEPTED;
}
