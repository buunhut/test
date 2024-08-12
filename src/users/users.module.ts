import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AppGateway } from 'src/app.gateway';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AppGateway],
})
export class UsersModule {}
