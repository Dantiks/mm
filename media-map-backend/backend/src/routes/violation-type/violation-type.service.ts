import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ViolationType } from '../../models/violation-type.models';
import * as path from 'path';
import * as fs from 'fs/promises';
import { CreateViolationTypeDto } from './dto/create-violation-type.dto';

@Injectable()
export class ViolationTypeService {
  constructor(
    @InjectModel(ViolationType)
    private violationTypeRepository: typeof ViolationType,
  ) {}

  async create(dto: CreateViolationTypeDto, icon: Express.Multer.File) {
    const violationType = await this.violationTypeRepository.findOne({
      where: { violationType: dto.violationType },
    });
    if (violationType) {
      throw new ConflictException('Такой вид нарушения уже существует');
    }
    const newDto = dto;
    if (icon) {
      newDto.icon = icon.filename;
    }
    return await this.violationTypeRepository.create(newDto);
  }

  async update(
    id: number,
    dto: CreateViolationTypeDto,
    icon: Express.Multer.File,
  ) {
    const transaction =
      await this.violationTypeRepository.sequelize.transaction();
    try {
      const violationType = await this.getById(id);

      if (dto.violationType) {
        violationType.violationType = dto.violationType;
      }

      if (icon) {
        const oldIconPath = path.resolve(
          process.cwd(),
          'static',
          'uploads',
          'icons',
          violationType.icon,
        );
        console.log('OLPATH ----------', oldIconPath);
        if (await fs.access(oldIconPath).catch(() => false)) {
          await fs.unlink(oldIconPath);
        }

        violationType.icon = icon.filename;
        console.log('New icon filename:', violationType.icon);
      }

      await violationType.save({ transaction });
      await transaction.commit();
      return violationType;
    } catch (e) {
      throw e;
    }
  }

  async getAll() {
    const result = await this.violationTypeRepository.findAll();
    if (!result.length) {
      throw new NotFoundException('Ничего не найдено');
    }
    return result;
  }

  async getOne(id: number) {
    return await this.getById(id);
  }

  async remove(id: number) {
    await this.getById(id);
    await this.violationTypeRepository.destroy({ where: { id } });
    return { message: 'Данный вид нарушения успешно удалён' };
  }

  async getById(id: number) {
    const result = await this.violationTypeRepository.findByPk(id);
    if (!result) {
      throw new NotFoundException('Данный вид нарушения не найден');
    }
    return result;
  }
}
