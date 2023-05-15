import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { userFixture, userFixture2 } from './user/user.seed';
import { CreateUserDto } from '../src/user/user.dto';
import { DataSource } from 'typeorm';
import { CreateShopDto } from '../src/shop/shop.dto';
import { farAwayShopFixture, shopFixture } from './shop/shop.seed';
import { CreateCardDto } from '../src/card/card.dto';
import { cardFixture } from './card/card.seed';
import { CreatePromotionDto } from '../src/promotion/promotion.dto';
import { promotionFixture } from './promotion/promotion.seed';
import { CreateBalanceDto } from '../src/balance/balance.dto';
import { balanceFixture } from './balance/balance.seed';
import { newDb } from 'pg-mem';
import { Balance } from '../src/balance/balance.entity';
import { Card } from '../src/card/card.entity';
import { Promotion } from '../src/promotion/promotion.entity';
import { Shop } from '../src/shop/shop.entity';
import { User } from '../src/user/user.entity';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import * as request from 'supertest';

export class TestFactory {
  private _app: INestApplication;
  private dataSource: DataSource;

  public get app(): INestApplication {
    return this._app;
  }

  /**
   * Connect to DB and start server
   */
  public async init(moduleRef: TestingModuleBuilder): Promise<TestingModule> {
    const module = await moduleRef.compile();

    this._app = module.createNestApplication();
    this._app.useGlobalPipes(new ValidationPipe());
    await this._app.init();
    return module;
  }

  public async configure(): Promise<TestingModuleBuilder> {
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

    const moduleRef = Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(this.dataSource)
      .overrideProvider(AuthService)
      .useValue({
        register: jest.fn(),
        login: jest.fn(),
        validate: jest.fn(),
      });

    return moduleRef;
  }

  /**
   * Close server and DB connection
   */
  public async close() {
    await this.dataSource.destroy();
    await this._app.close();
  }

  public async get(path: string): Promise<request.Test> {
    return request(this.app.getHttpServer())
      .get(path)
      .set('Authorization', 'bearer some-token')
      .set('Accept', 'application/json');
  }

  public post(path: string): request.Test {
    return request(this.app.getHttpServer())
      .post(path)
      .set('Authorization', 'bearer some-token')
      .set('Accept', 'application/json');
  }

  public put(path: string): request.Test {
    return request(this.app.getHttpServer())
      .put(path)
      .set('Authorization', 'bearer some-token')
      .set('Accept', 'application/json');
  }

  public async delete(path: string): Promise<request.Test> {
    return request(this.app.getHttpServer())
      .delete(path)
      .set('Authorization', 'bearer some-token')
      .set('Accept', 'application/json');
  }

  public async seed() {
    await this.seedUser();
    await this.seedUser(userFixture2);
    await this.seedShop();
    await this.seedShop(farAwayShopFixture, 2);
    await this.seedPromotion();
    await this.seedCard();
    await this.seedBalance();
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
  public async seedShop(_shop?: CreateShopDto, _userId?: number) {
    await this.dataSource
      .getRepository(Shop)
      .save({ ...new Shop(), userId: _userId ?? 1, ...(_shop ?? shopFixture) });
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
  public async seedPromotion(
    _promotion?: CreatePromotionDto,
    _shopId?: number,
  ) {
    await this.dataSource.getRepository(Promotion).save({
      ...new Promotion(),
      shopId: _shopId ?? 1,
      ...(_promotion ?? promotionFixture),
    });
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
