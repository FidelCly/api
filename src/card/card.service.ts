import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  findOne(id: number): Promise<Card | null> {
    return this.cardsRepository.findOneBy({ id });
  }

  create(createCardDto: CreateCardDto): Promise<Card> {
    const card = { ...new Card(), ...createCardDto };
    return this.cardsRepository.save(card);
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<UpdateResult> {
    return this.cardsRepository.update(id, updateCardDto);
  }

  async remove(id: number): Promise<void> {
    await this.cardsRepository.softDelete(id);
  }

  async removeUsersCards(userId: number): Promise<UpdateResult> {
    return this.cardsRepository.softDelete({ userId: userId });
  }

  async removeShopsCards(shopId: number): Promise<UpdateResult> {
    return this.cardsRepository.softDelete({ shopId: shopId });
  }
}
