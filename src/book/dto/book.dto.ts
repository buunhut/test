import { ApiProperty } from '@nestjs/swagger';

export class LevelDto {
  @ApiProperty({ type: 'string' })
  levelName: string;
}
export class ClassDto {
  @ApiProperty({ type: 'string' })
  className: string;
  @ApiProperty({ type: 'number' })
  levelId: number;
}
export class BookDto {
  @ApiProperty({ type: 'string' })
  bookName: string;
  @ApiProperty({ type: 'number' })
  classId: number;
}
export class PageDto {
  @ApiProperty({ type: 'string' })
  pageContent: string;
  @ApiProperty({ type: 'number' })
  bookId: number;
}
