// In UsersService
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { AppGateway } from 'src/app.gateway';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly gatewayService: AppGateway) {}

  async fetchListUser() {
    return prisma.users.findMany({
      where: {
        isDelete: false,
      },
      orderBy: {
        userId: 'desc',
      },
    });
  }

  async emitToClients(event: string, payload: any) {
    this.gatewayService.handleEmitToClients(event, payload);
  }

  async create(payload: any) {
    try {
      const created = await prisma.users.create({ data: payload });
      if (created) {
        // this.server.emit('reload'); //this.server is not working
        this.emitToClients('reload', []);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async delete(payload: any) {
    try {
      const { userId } = payload;
      const deleted = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          isDelete: true,
        },
      });
      if (deleted) {
        // this.server.emit('reload'); //this.server is not working
        this.emitToClients('reload', []);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async findAll() {
    try {
      return this.fetchListUser();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
}
