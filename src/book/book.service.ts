import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AppService } from 'src/app.service';
import { BookDto, ClassDto, LevelDto, PageDto } from './dto/book.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BookService {
  constructor(private readonly service: AppService) {}

  async createLevel(body: LevelDto) {
    try {
      const { levelName } = body;
      const check = await prisma.level.findFirst({
        where: {
          levelName: levelName.trim(),
          isDelete: false,
        },
      });
      if (!check) {
        const create = await prisma.level.create({
          data: body,
        });
        if (create) {
          return this.service.response(200, 'done', levelName);
        }
      } else {
        return this.service.response(409, 'existed', levelName);
      }
    } catch (error) {
      return this.service.response(500, 'error', []);
    }
  }
  async createClass(body: ClassDto) {
    try {
      const { className } = body;
      const check = await prisma.myclass.findFirst({
        where: {
          className: className.trim(),
          isDelete: false,
        },
      });
      if (!check) {
        const create = await prisma.myclass.create({
          data: body,
        });
        if (create) {
          return this.service.response(200, 'done', className);
        }
      } else {
        return this.service.response(409, 'existed', className);
      }
    } catch (error) {
      return this.service.response(500, 'error', []);
    }
  }
  createBook(body: BookDto) {
    return 'This action adds a new book';
  }
  createPage(body: PageDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
