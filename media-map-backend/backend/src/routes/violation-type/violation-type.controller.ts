import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { ViolationTypeService } from './violation-type.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ViolationType } from '../../models/violation-type.models';
import { CreateViolationTypeDto } from './dto/create-violation-type.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions } from '../../../multer.config';

@ApiTags('Виды нарушений')
@Controller('violation-types')
export class ViolationTypeController {
  constructor(private readonly violationTypeService: ViolationTypeService) {}

  @ApiOperation({ summary: 'Создать вида нарушения' })
  @ApiResponse({ status: 200, type: ViolationType })
  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('icon', createMulterOptions('icons')))
  create(
    @Body() violationTypeDto: CreateViolationTypeDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    return this.violationTypeService.create(violationTypeDto, icon);
  }

  @ApiOperation({ summary: 'Обновить вид нарушения' })
  @ApiResponse({ status: 200, type: ViolationType })
  @UseGuards(TokenAuthGuard)
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('icon', createMulterOptions('icons')))
  update(
    @Param('id') id: number,
    @Body() dto: CreateViolationTypeDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    return this.violationTypeService.update(id, dto, icon);
  }

  @ApiOperation({ summary: 'Получить вид нарушения по ID' })
  @ApiResponse({ status: 200, type: [ViolationType] })
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.violationTypeService.getAll();
  }

  @ApiOperation({ summary: 'Получить вид нарушения по ID' })
  @ApiResponse({ status: 200, type: [ViolationType] })
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.violationTypeService.getOne(id);
  }

  @ApiOperation({ summary: 'Удалить вид нарушения по ID' })
  @ApiResponse({ status: 200, type: [ViolationType] })
  @UseGuards(TokenAuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.violationTypeService.remove(id);
  }
}
