import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBalanceDto, UpdateBalanceDto } from './balance.dto';
import { Balance } from './balance.entity';
import {
  BALANCE_SERVICE_NAME,
  BalanceServiceClient,
} from '../analytics/balance.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class BalanceService {
  @InjectRepository(Balance)
  private repository: Repository<Balance>;

  private analyticsService: BalanceServiceClient;

  @Inject(BALANCE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.analyticsService =
      this.client.getService<BalanceServiceClient>(BALANCE_SERVICE_NAME);
  }

  // DATABASE MANIPULATION

  findOne(id: number): Promise<Balance | null> {
    return this.repository.findOne({
      where: { id },
      relations: { card: { shop: true, user: true } },
    });
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

  // CASCADE DELETION

  removeCardsBalances(cardId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ cardId: cardId });
  }

  removePromotionsBalances(promotionId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ promotionId: promotionId });
  }

  // ANALYTICS

  sendToAnalytics(balance: Balance) {
    this.analyticsService.send(balance);
  }
}
