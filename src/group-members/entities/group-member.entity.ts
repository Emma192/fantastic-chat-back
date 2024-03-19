import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

@Entity('groupMembers')
export class GroupMember {

    @PrimaryColumn()
    groupId: number;

    @PrimaryColumn()
    memberId: number;

    @ManyToOne(() => Group, group => group.members)
    @JoinColumn({ name: 'groupId' })
    group: Group;

    @ManyToOne(() => User, user => user.groups)
    @JoinColumn({ name: 'memberId' })
    member: User;
}
