import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private repository: Repository<Card>,
  ) {}

  findOne(id: number): Promise<Card | null> {
    return this.repository.findOneBy({ id });
  }

  create(createCardDto: CreateCardDto, userId: number): Promise<Card> {
    const card = { ...new Card(), ...createCardDto, userId: userId };
    return this.repository.save(card);
  }

  update(id: number, updateCardDto: UpdateCardDto): Promise<UpdateResult> {
    return this.repository.update(id, updateCardDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  removeUsersCards(userId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ userId: userId });
  }

  removeShopsCards(shopId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ shopId: shopId });
  }
}
