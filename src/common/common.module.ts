import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters';
import { PaginationDto } from './dto';

@Module({
  providers: [AxiosAdapter, PaginationDto],
  imports: [HttpModule],
  exports: [AxiosAdapter, PaginationDto],
})
export class CommonModule {}
