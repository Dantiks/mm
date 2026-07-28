import { Controller, Get, Delete, Param, Query, Post, Put, Body, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.newsService.getAllNews(pageNumber, limitNumber);
  }

  @Post()
  @UseGuards(TokenAuthGuard)
  create(@Body() createNewsDto: any) {
    return this.newsService.create(createNewsDto);
  }

  @Put(':id')
  @UseGuards(TokenAuthGuard)
  update(@Param('id') id: string, @Body() updateNewsDto: any) {
    return this.newsService.update(Number(id), updateNewsDto);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  async deleteNews(@Param('id') id: string) {
    await this.newsService.deleteNews(Number(id));
    return { success: true };
  }

  @Get('trigger-fetch')
  @UseGuards(TokenAuthGuard)
  async triggerFetch() {
    await this.newsService.fetchAndParseNews();
    return { success: true, message: 'RSS fetch triggered successfully.' };
  }
}
