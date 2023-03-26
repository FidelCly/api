import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { Promotion } from './promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private repository: Repository<Promotion>,
  ) {}

  findOne(id: number): Promise<Promotion | null> {
    return this.repository.findOneBy({ id });
  }

  create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = { ...new Promotion(), ...createPromotionDto };
    return this.repository.save(promotion);
  }

  update(
    id: number,
    updatePromotionDto: UpdatePromotionDto,
  ): Promise<UpdateResult> {
    return this.repository.update(id, updatePromotionDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  removeShopsPromotions(shopId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ shopId: shopId });
  }
}
