import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppGateway } from './app.gateway';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  constructor(private readonly gatewayService: AppGateway) {}

  response(statusCode: number, message: string, content: any) {
    return {
      statusCode,
      message,
      content,
    };
  }
  async emitToClients(event: string, payload: any) {
    this.gatewayService.handleEmitToClients(event, payload);
  }
}
