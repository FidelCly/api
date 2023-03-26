import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBalanceDto, UpdateBalanceDto } from './balance.dto';
import { Balance } from './balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private repository: Repository<Balance>,
  ) {}

  findOne(id: number): Promise<Balance | null> {
    return this.repository.findOneBy({ id });
  }

  create(createBalanceDto: CreateBalanceDto): Promise<Balance> {
    const balance = { ...new Balance(), ...createBalanceDto };
    return this.repository.save(balance);
  }

  update(
    id: number,
    updateBalanceDto: UpdateBalanceDto,
  ): Promise<UpdateResult> {
    return this.repository.update(id, updateBalanceDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  removeCardsBalances(cardId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ cardId: cardId });
  }

  removePromotionsBalances(promotionId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ promotionId: promotionId });
  }
}
