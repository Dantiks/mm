import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Marker } from '../../models/markers.models';
import { CreateMarkerDto } from './dto/create-marker.dto';
import * as path from 'path';
import { promises as fs } from 'fs';
import { UsersService } from '../users/users.service';
import { ViolationTypeService } from '../violation-type/violation-type.service';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { EmailService } from '../../email/email.service';
import { AiService } from '../../ai/ai.service';

@Injectable()
export class MarkersService {
  constructor(
    @InjectModel(Marker) private markerRepository: typeof Marker,
    private userService: UsersService,
    private violationTypeService: ViolationTypeService,
    private readonly emailService: EmailService,
    private readonly aiService: AiService,
  ) {}

  async create(dto: CreateMarkerDto, image: Express.Multer.File) {
    const newDto = dto;
    if (dto.userId) {
      await this.userService.getById(newDto.userId);
    }
    const violationType = await this.violationTypeService.getById(newDto.violationTypeId);
    if (image) {
      newDto.image = image.filename;
    }

    // Автоматическая проверка через ИИ (GPT-4o mini)
    try {
      const contentToAnalyze = [
        newDto.authorComment ? `Текст заявки: "${newDto.authorComment}"` : '',
        newDto.mediaLink ? `Ссылка/Источник: ${newDto.mediaLink}` : '',
        `Регион и город: ${newDto.authorRegion}, ${newDto.authorCity}`,
        newDto.image ? `Прикреплен файловый скриншот: ${newDto.image}` : ''
      ].filter(Boolean).join('\n') || `Заявка по городу ${newDto.authorCity}`;

      const aiResult = await this.aiService.analyzeContent({
        content: contentToAnalyze,
        category: violationType?.violationType,
      });

      if (aiResult && aiResult.analysis) {
        newDto.moderatorComment = `🤖 [Автоматический ИИ-разбор GPT-4o mini]:\n${aiResult.analysis}`;
      }
    } catch (e) {
      console.error('Ошибка при автоматическом ИИ-анализе:', e);
    }

    await this.emailService.sendEmail(
      'elmirat.daniela@gmail.com, aselsooronbaeva@gmail.com',
      'Новая запись в приложении Media Map',
      `Создана новая запись! Город: ${newDto.authorCity}, Регион: ${newDto.authorRegion}`,
    );
    return await this.markerRepository.create(newDto);
  }

  async getAll(isApproved?: boolean) {
    const where = isApproved !== undefined ? { isApproved } : {};
    // Пустой список — не ошибка. Раньше отдавали 404, и очередь модерации
    // «падала», когда в ней просто нет заявок.
    return this.markerRepository.findAll({
      where,
      include: { all: true },
    });
  }

  async getByType(violationTypeId: number) {
    return this.markerRepository.findAll({
      where: { violationTypeId },
    });
  }

  async getOne(id: number) {
    return await this.getMarkerByPK(id);
  }

  async update(
    id: number,
    markerDto: CreateMarkerDto,
    image: Express.Multer.File,
  ) {
    const transaction = await this.markerRepository.sequelize.transaction();
    try {
      const result = await this.getMarkerByPK(id);
      await this.userService.getById(markerDto.userId);
      await this.violationTypeService.getById(markerDto.violationTypeId);

      if (image) {
        const oldImagePath = path.resolve(
          process.cwd(),
          'static',
          'uploads',
          'screenshots',
          result.image,
        );
        if (await fs.access(oldImagePath).catch(() => false)) {
          await fs.unlink(oldImagePath);
        }
        markerDto.image = image.filename;
      }
      await result.update(markerDto, { transaction });
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateMarker(
    id: number,
    updateData: UpdateMarkerDto,
    image?: Express.Multer.File,
  ) {
    const transaction = await this.markerRepository.sequelize.transaction();
    console.log('UPDATED DATA _-----------------', updateData);
    try {
      const marker = await this.getMarkerByPK(id);
      if (updateData.position && updateData.isApproved) {
        marker.position = JSON.parse(updateData.position);
        marker.isApproved = updateData.isApproved;
      }
      if (updateData.violationTypeId) {
        await this.violationTypeService.getById(updateData.violationTypeId);
        marker.violationTypeId = updateData.violationTypeId;
      }
      if (updateData.authorComment) {
        marker.authorComment = updateData.authorComment;
      }
      if (updateData.mediaLink) {
        marker.mediaLink = updateData.mediaLink;
      }
      if (updateData.moderatorComment) {
        marker.moderatorComment = updateData.moderatorComment;
      }
      if (updateData.authorRegion) {
        marker.authorRegion = updateData.authorRegion;
      }
      if (updateData.authorCity) {
        marker.authorCity = updateData.authorCity;
      }
      if (image) {
        if (marker.image) {
          const oldImagePath = path.resolve(
            process.cwd(),
            'static',
            'uploads',
            'screenshots',
            marker.image,
          );

          // Проверяем, существует ли файл
          if (await fs.access(oldImagePath).catch(() => false)) {
            await fs.unlink(oldImagePath);
          }
        }

        // Устанавливаем новое имя файла
        marker.image = image.filename;
      }

      await marker.save({ transaction });
      await transaction.commit();

      return marker;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: number) {
    const result = await this.getMarkerByPK(id);

    if (result.image) {
      const filePath = path.resolve(
        process.cwd(),
        'static',
        'uploads',
        'screenshots',
        result.image,
      );

      if (await fs.access(filePath).catch(() => false)) {
        await fs.unlink(filePath);
      }
    }

    await this.markerRepository.destroy({ where: { id } });
    return { message: 'Маркер успешно удалён' };
  }

  private async getMarkerByPK(id: number) {
    const result = await this.markerRepository.findByPk(id, {
      include: { all: true },
    });
    if (!result) {
      throw new NotFoundException('Маркер не найден');
    }
    return result;
  }
}
