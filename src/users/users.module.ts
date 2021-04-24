import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: Users }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
