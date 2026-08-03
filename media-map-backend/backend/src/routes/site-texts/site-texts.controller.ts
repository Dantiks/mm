import { Body, Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiteTextsService } from './site-texts.service';
import { BulkUpdateSiteTextsDto } from './dto/update-site-text.dto';

@ApiTags('Управление текстами сайта (CMS)')
@Controller('site-texts')
export class SiteTextsController {
  constructor(private readonly siteTextsService: SiteTextsService) {}

  @ApiOperation({ summary: 'Получить все тексты сайта (RU / KY)' })
  @ApiResponse({ status: 200, description: 'Все тексты успешно получены' })
  @Get()
  async getAll() {
    return this.siteTextsService.getAll();
  }

  @ApiOperation({ summary: 'Пакетное обновление текстов сайта (для Админ-панели)' })
  @ApiResponse({ status: 200, description: 'Тексты успешно обновлены' })
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateBulk(@Body() dto: BulkUpdateSiteTextsDto) {
    return this.siteTextsService.updateBulk(dto.items);
  }
}
