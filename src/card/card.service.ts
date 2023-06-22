import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  CARD_SERVICE_NAME,
  CardServiceClient,
} from '../analytics/analytics.pb';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { Card } from './card.entity';
import { CARD_SERVICE_NAME, CardServiceClient } from '../analytics/card.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class CardService {
  @InjectRepository(Card)
  private repository: Repository<Card>;

  private analyticsService: CardServiceClient;

  @Inject(CARD_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.analyticsService =
      this.client.getService<CardServiceClient>(CARD_SERVICE_NAME);
  }

  // DATABASE MANIPULATION

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

  // CASCADE DELETION

  removeUsersCards(userId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ userId: userId });
  }

  removeShopsCards(shopId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ shopId: shopId });
  }

  // ANALYTICS

  sendToAnalytics(card: Card) {
    this.analyticsService.send({
      ...card,
      startAt: new Date(card.startAt).toISOString(),
      endAt: new Date(card.endAt).toISOString(),
    });
  }
}
