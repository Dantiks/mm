import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ViolationType } from '../../models/violation-type.models';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { Marker } from '../../models/markers.models';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions } from '../../../multer.config';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';

@ApiTags('Маркеры')
@Controller('markers')
export class MarkersController {
  constructor(private readonly markerService: MarkersService) {}

  @ApiOperation({ summary: 'Создать маркер' })
  @ApiResponse({ status: 200, type: ViolationType })
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions('screenshots')))
  create(
    @Body() markerDto: CreateMarkerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.markerService.create(markerDto, image);
  }

  @ApiOperation({ summary: 'Получить все маркеры' })
  @ApiResponse({ status: 200, type: [Marker] })
  @Get()
  getAll(@Query('isApproved') isApproved?: string) {
    const parsed =
      isApproved === undefined
        ? undefined
        : isApproved === 'true' || isApproved === '1'
          ? true
          : false;
    return this.markerService.getAll(parsed);
  }

  @ApiOperation({ summary: 'Получить все маркеры опредленного вида нарушения' })
  @ApiResponse({ status: 200, type: [Marker] })
  @Get('by-type')
  getByType(@Query('violationTypeId') violationTypeId: number) {
    return this.markerService.getByType(violationTypeId);
  }

  @ApiOperation({ summary: 'Получить маркер по ID' })
  @ApiResponse({ status: 200, type: [Marker] })
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.markerService.getOne(id);
  }

  @ApiOperation({ summary: 'Обновить маркер' })
  @ApiResponse({ status: 200, type: [Marker] })
  @UseGuards(TokenAuthGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions('screenshots')))
  update(
    @Param('id') id: number,
    @Body() markerDto: CreateMarkerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.markerService.update(id, markerDto, image);
  }

  @ApiOperation({ summary: 'Обновить маркер (PATCH)' })
  @ApiResponse({ status: 200, description: 'Маркер обновлён успешно' })
  @UseGuards(TokenAuthGuard)
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions('screenshots')))
  async updateMarker(
    @Param('id') id: number,
    @Body() body: UpdateMarkerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.markerService.updateMarker(id, body, image);
  }

  @ApiOperation({ summary: 'Удалить маркер' })
  @ApiResponse({ status: 200, type: [Marker] })
  @UseGuards(TokenAuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.markerService.remove(id);
  }
}
