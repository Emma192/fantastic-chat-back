/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import dbConfig from 'src/config/database.config';
import { MySqlConfig } from './config/mysql.config';

import * as dotenv from 'dotenv'
import { UsersModule } from './users/users.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { MessagesModule } from './messages/messages.module';
import { GroupsModule } from './groups/groups.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { GroupMessagesModule } from './group-messages/group-messages.module';
import { AuthModule } from './auth/auth.module';

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: [`./envs/.env.${process.env.APP_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass:MySqlConfig,
      inject:[MySqlConfig]
      // useFactory: async (configService: ConfigService) => ({
      //   ...(await configService.get('database')),
      // }),
      // inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    FriendshipsModule,
    MessagesModule,
    GroupsModule,
    GroupMembersModule,
    GroupMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
