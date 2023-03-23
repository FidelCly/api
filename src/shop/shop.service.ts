import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateShopDto, UpdateShopDto } from './shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  /**
   * Get all shops
   * @returns A list of shops
   */
  all(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  /**
   * Find shop by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOne = (id: number): Promise<Shop | null> => {
    return this.shopRepository.findOneBy({
      id,
    });
  };

  /**
   * Find shop by email
   * @param email - Email of the shop
   * @returns A shop if found
   */
  findOneByEmail = (email: string): Promise<Shop | null> => {
    return this.shopRepository.findOneBy({
      email,
    });
  };

  /**
   * Find shop promotions by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOnePromotions = (id: number): Promise<Shop | null> => {
    return this.shopRepository.findOne({
      where: { id },
      relations: { promotions: true },
    });
  };

  /**
   * Find shop clients by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  findOneClients = (id: number): Promise<Shop | null> => {
    return this.shopRepository.findOne({
      where: { id },
      relations: { cards: { user: true, balances: true } },
    });
  };

  /**
   * Create a shop on the db
   * @param createShopDto - The shop to create
   */
  create(createShopDto: CreateShopDto): Promise<Shop> {
    const shop = { ...new Shop(), ...createShopDto };
    return this.shopRepository.save(shop);
  }

  /**
   * Update a shop on the db
   * @param id - The shop to update
   * @param updateShopDto - The updated shop
   */
  update(id: number, updateShopDto: UpdateShopDto): Promise<UpdateResult> {
    return this.shopRepository.update(id, updateShopDto);
  }

  /**
   * Delete a shop from the db
   * @param id - The id of the shop to delete
   */
  remove(id: number): Promise<UpdateResult> {
    return this.shopRepository.softDelete(id);
  }

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
}
