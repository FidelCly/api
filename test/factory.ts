import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { userFixture } from './user/user.seed';
import { CreateUserDto } from '../src/user/user.dto';
import { DataSource } from 'typeorm';
import { CreateShopDto } from '../src/shop/shop.dto';
import { shopFixture } from './shop/shop.seed';
import { CreateCardDto } from '../src/card/card.dto';
import { cardFixture } from './card/card.seed';
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

  public get app(): INestApplication {
    return this._app;
  }

  /**
   * Connect to DB and start server
   */
  public async init() {
    const db = newDb({ autoCreateForeignKeyIndices: true });
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database',
    });
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'version',
    });

    this.dataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [User, Card, Shop, Promotion, Balance],
    });

    await this.dataSource.initialize();
    await this.dataSource.synchronize();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(this.dataSource)
      .overrideGuard(AuthGuard)
      .useValue(null)
      .compile();

    this._app = moduleRef.createNestApplication();
    this._app.useGlobalPipes(new ValidationPipe());
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
    await this.dataSource
      .getRepository(User)
      .save({ ...new User(), ...(_user ?? userFixture) });
  }

  /**
   * Seed shop
   */
  public async seedShop(_shop?: CreateShopDto) {
    await this.dataSource
      .getRepository(Shop)
      .save({ ...new Shop(), ...(_shop ?? shopFixture) });
  }

  /**
   * Seed card
   */
  public async seedCard(_card?: CreateCardDto) {
    await this.dataSource
      .getRepository(Card)
      .save({ ...new Card(), ...(_card ?? cardFixture) });
  }

  /**
   * Seed promotion
   */
  public async seedPromotion(_promotion?: CreatePromotionDto) {
    await this.dataSource
      .getRepository(Promotion)
      .save({ ...new Promotion(), ...(_promotion ?? promotionFixture) });
  }

  /**
   * Seed balance
   */
  public async seedBalance(_balance?: CreateBalanceDto) {
    await this.dataSource
      .getRepository(Balance)
      .save({ ...new Balance(), ...(_balance ?? balanceFixture) });
  }
}
