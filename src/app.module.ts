import { LocationController } from './location/location.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UsersModule } from './users/users.module';
import { CategorysModule } from './categorys/categorys.module';
import { LocationModule } from './location/location.module';
import { LocationService } from './location/location.service';
import { UsersController } from './users/users.controller';
import { CategorysController } from './categorys/categorys.controller';
import { UsersService } from './users/users.service';
import { CategorysService } from './categorys/categorys.service';
import { BookModule } from './book/book.module';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [AppService,BookModule],
  controllers: [
    AppController,
    // UsersController,
    // CategorysController,
    // LocationController,
    // BookController,
    
  ],
  providers: [
    // AppGateway,

    // AppService,

    // UsersService,
    // CategorysService,
    // LocationService,
    // BookService,
  ],
})
export class AppModule {}
