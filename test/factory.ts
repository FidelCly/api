import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { userFixture } from './user/user.seed';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/user.dto';
import { UserService } from '../src/user/user.service';
import { DataSource } from 'typeorm';
import { CreateShopDto } from '../src/shop/shop.dto';
import { shopFixture } from './shop/shop.seed';
import { ShopService } from '../src/shop/shop.service';
import { CardService } from '../src/card/card.service';
import { CreateCardDto } from '../src/card/card.dto';
import { cardFixture } from './card/card.seed';
import { PromotionService } from '../src/promotion/promotion.service';
import { BalanceService } from '../src/balance/balance.service';
import { CreatePromotionDto } from '../src/promotion/promotion.dto';
import { promotionFixture } from './promotion/promotion.seed';
import { CreateBalanceDto } from '../src/balance/balance.dto';
import { balanceFixture } from './balance/balance.seed';

export class TestFactory {
  private _app: INestApplication;
  private dataSource: DataSource;
  private userService: UserService;
  private shopService: ShopService;
  private cardService: CardService;
  private promotionService: PromotionService;
  private balanceService: BalanceService;

  public get app(): INestApplication {
    return this._app;
  }

  /**
   * Connect to DB and start server
   */
  public async init() {
    process.env.NODE_ENV = 'test';
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this._app = moduleRef.createNestApplication();
    this._app.useGlobalPipes(new ValidationPipe());

    this.dataSource = moduleRef.get<DataSource>(DataSource);
    this.userService = moduleRef.get<UserService>(UserService);
    this.cardService = moduleRef.get<CardService>(CardService);
    this.shopService = moduleRef.get<ShopService>(ShopService);
    this.promotionService = moduleRef.get<PromotionService>(PromotionService);
    this.balanceService = moduleRef.get<BalanceService>(BalanceService);

    this.dataSource.synchronize();
    await this._app.init();
  }

  /**
   * Close server and DB connection
   */
  public async close() {
    await this.dataSource.dropDatabase();
    await this.dataSource.destroy();
    await this._app.close();
  }

  /**
   * Seed user
   */
  public async seedUser(_user?: CreateUserDto) {
    await this.userService.create(_user ?? userFixture);
  }

  /**
   * Seed shop
   */
  public async seedShop(_shop?: CreateShopDto) {
    await this.shopService.create(_shop ?? shopFixture);
  }

  /**
   * Seed card
   */
  public async seedCard(_card?: CreateCardDto) {
    await this.cardService.create(_card ?? cardFixture);
  }

  /**
   * Seed promotion
   */
  public async seedPromotion(_promotion?: CreatePromotionDto) {
    await this.promotionService.create(_promotion ?? promotionFixture);
  }

  /**
   * Seed balance
   */
  public async seedBalance(_balance?: CreateBalanceDto) {
    await this.balanceService.create(_balance ?? balanceFixture);
  }
}
