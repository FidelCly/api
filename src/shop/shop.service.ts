import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import {
  SHOP_SERVICE_NAME,
  ShopServiceClient,
} from '../analytics/analytics.pb';
import { CreateShopDto, UpdateShopDto } from './shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  @InjectRepository(Shop)
  private repository: Repository<Shop>;

  private analyticsService: ShopServiceClient;

  @Inject(SHOP_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.analyticsService =
      this.client.getService<ShopServiceClient>(SHOP_SERVICE_NAME);
  }

  // DATABASE MANIPULATION

  /**
   * Get all shops
   * @returns A list of shops
   */
  all(): Promise<Shop[]> {
    return this.repository.find({
      relations: { promotions: true, cards: true },
    });
  }

  /**
   * Find shop by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOne = (id: number): Promise<Shop | null> => {
    return this.repository.findOneBy({
      id,
    });
  };

  /**
   * Find shop by userId
   * @param userId - Id of the shop
   * @returns A shop if found
   */
  findOnebyUserId = (userId: number): Promise<Shop | null> => {
    return this.repository.findOneBy({
      userId,
    });
  };

  /**
   * Find shop by email
   * @param email - Email of the shop
   * @returns A shop if found
   */
  findOneByEmail = (email: string): Promise<Shop | null> => {
    return this.repository.findOneBy({
      email,
    });
  };

  /**
   * Find shop promotions by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOnePromotions = (id: number): Promise<Shop | null> => {
    return this.repository.findOne({
      where: { id },
      relations: { promotions: true, user: true },
    });
  };

  /**
   * Find shop clients by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOneClients = (id: number): Promise<Shop | null> => {
    return this.repository.findOne({
      where: { id },
      relations: {
        cards: { user: true, balances: { promotion: true } },
        user: true,
      },
    });
  };

  /**
   * Find shop campaigns by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOneCampaigns = (id: number): Promise<Shop | null> => {
    return this.repository.findOne({
      where: { id },
      relations: { campaigns: { promotion: true }, user: true },
    });
  };

  /**
   * Create a shop on the db
   * @param createShopDto - The shop to create
   */
  create(createShopDto: CreateShopDto, userId: number): Promise<Shop> {
    const shop: Shop = {
      ...new Shop(),
      ...createShopDto,
      userId: userId,
      marketingEmail: createShopDto.email,
    };
    return this.repository.save(shop);
  }

  /**
   * Update a shop on the db
   * @param id - The shop to update
   * @param updateShopDto - The updated shop
   */
  update(id: number, updateShopDto: UpdateShopDto): Promise<UpdateResult> {
    return this.repository.update(id, updateShopDto);
  }

  /**
   * Delete a shop from the db
   * @param id - The id of the shop to delete
   */
  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  // CASCADE DELETION

  /**
   * Delete a user's shop when fider
   * @param userId - The id of the shop's user to delete
   */
  removeUsersShop(userId: number): Promise<UpdateResult> {
    return this.repository.softDelete({ userId: userId });
  }

  // HELPER METHODS

  /**
   * Get distance between two geolocation points.
   *
   * @param lat1 - The latitude of the first geoloc
   * @param long1 - The longitude of the first geoloc
   * @param lat2 - The latitude of the second geoloc
   * @param long2 - The longitude of the second geoloc
   *
   * @returns The distance in metres (float)
   */
  getDistance(
    lat1: number,
    long1: number,
    lat2: number,
    long2: number,
  ): number {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((long2 - long1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  }

  // ANALYTICS

  sendToAnalytics(shop: Shop) {
    return firstValueFrom(this.analyticsService.send(shop));
  }
}
