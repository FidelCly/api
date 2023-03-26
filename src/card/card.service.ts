import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  findOne(id: number): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  create(createCardDto: CreateCardDto): Promise<Card> {
    const card = { ...new Card(), ...createCardDto };
    return this.cardRepository.save(card);
  }

  update(id: number, updateCardDto: UpdateCardDto): Promise<UpdateResult> {
    return this.cardRepository.update(id, updateCardDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.cardRepository.softDelete(id);
  }

  removeUsersCards(userId: number): Promise<UpdateResult> {
    return this.cardRepository.softDelete({ userId: userId });
  }

  removeShopsCards(shopId: number): Promise<UpdateResult> {
    return this.cardRepository.softDelete({ shopId: shopId });
  }
}
