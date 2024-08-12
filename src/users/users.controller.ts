import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() payload: any) {
    return this.usersService.create(payload);
  }
  @Delete()
  delete(@Body() payload: any) {
    return this.usersService.delete(payload);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
