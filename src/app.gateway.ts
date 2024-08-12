import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { UsersService } from './users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // constructor(private readonly usersService: UsersService) {}

  handleConnection(client: Socket) {
    // console.log('Client connected:', client.id);
    // this.usersService.setServer(this.server); // Pass the server instance to the UsersService
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected:', client.id);
  }
  handleEmitToClients(event: string, payload: any) {
    this.server.emit(event, payload);
  }
  afterInit() {
    // console.log('afterInit', this.server);
    // this.usersService.setServer(this.server); // Pass the server instance to the UsersService
  }

  // @SubscribeMessage('createUser')
  // handleCreate(client: Socket, payload: any): void {
  //   this.usersService.create(payload);
  // }
  // @SubscribeMessage('deleteUser')
  // handleDelete(client: Socket, payload: any): void {
  //   this.usersService.delete(payload);
  // }
}
