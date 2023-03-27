import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { userFixture } from './user/user.seed';
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
import { AuthGuard } from '../src/auth/auth.guard';
import { newDb } from 'pg-mem';
import { Balance } from '../src/balance/balance.entity';
import { Card } from '../src/card/card.entity';
import { Promotion } from '../src/promotion/promotion.entity';
import { Shop } from '../src/shop/shop.entity';
import { User } from '../src/user/user.entity';
import { AppModule } from '../src/app.module';

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

    const db = newDb({ autoCreateForeignKeyIndices: true });
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database',
    });
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'version',
    });

    const customDataSource: DataSource =
      await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: [User, Card, Shop, Promotion, Balance],
      });

    await customDataSource.initialize();
    await customDataSource.synchronize();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(customDataSource)
      .overrideGuard(AuthGuard)
      .useValue(null)
      .compile();

    this._app = moduleRef.createNestApplication();
    this._app.useGlobalPipes(new ValidationPipe());

    this.dataSource = customDataSource;
    this.userService = moduleRef.get<UserService>(UserService);
    this.cardService = moduleRef.get<CardService>(CardService);
    this.shopService = moduleRef.get<ShopService>(ShopService);
    this.promotionService = moduleRef.get<PromotionService>(PromotionService);
    this.balanceService = moduleRef.get<BalanceService>(BalanceService);

    await this._app.init();
  }

  /**
   * Close server and DB connection
   */
  public async close() {
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
