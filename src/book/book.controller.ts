import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { BookDto, ClassDto, LevelDto, PageDto } from './dto/book.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/level')
  createLevel(@Body() body: LevelDto) {
    return this.bookService.createLevel(body);
  }

  @Post('/class')
  createClass(@Body() body: ClassDto) {
    return this.bookService.createClass(body);
  }
  @Post('/book')
  createBook(@Body() body: BookDto) {
    return this.bookService.createBook(body);
  }
  @Post('/page')
  createPage(@Body() body: PageDto) {
    return this.bookService.createPage(body);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
