import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SiteTextsService } from './site-texts.service';
import { BulkUpdateSiteTextsDto } from './dto/update-site-text.dto';
import { AdminGuard } from '../../auth/admin.guard';
import { createMulterOptions } from '../../../multer.config';

const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

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

  @ApiOperation({ summary: 'Значения по умолчанию (для отката правок)' })
  @Get('defaults')
  async getDefaults() {
    return this.siteTextsService.getDefaults();
  }

  @ApiOperation({ summary: 'Пакетное обновление текстов сайта (для Админ-панели)' })
  @ApiResponse({ status: 200, description: 'Тексты успешно обновлены' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нужна роль admin' })
  @UseGuards(AdminGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateBulk(@Body() dto: BulkUpdateSiteTextsDto) {
    return this.siteTextsService.updateBulk(dto.items);
  }

  @ApiOperation({ summary: 'Загрузить изображение для инлайн-редактора' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AdminGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', createMulterOptions('site')))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('Файл не передан');
    }

    if (!ALLOWED_IMAGE_TYPES.includes(image.mimetype)) {
      throw new BadRequestException(
        `Недопустимый тип файла: ${image.mimetype}. Разрешены PNG, JPEG, WebP, GIF, SVG.`,
      );
    }

    if (image.size > MAX_IMAGE_BYTES) {
      throw new BadRequestException('Файл больше 5 МБ');
    }

    return { path: `/api/static/uploads/site/${image.filename}` };
  }
}
