import { getDataSource } from ".";
import { PromotionCounter } from "../entities/promotion-counter";

export class PromotionCounterRepository {
	/**
	 * Find promotionCounter by promotionId for the user
	 * @param id - Id of the promotionCounter
	 * @returns A promotionCounter if found
	 */
	static findOneUser = async (userId: number, shopId: number, promotionId: number): Promise<PromotionCounter> => {
		const data =
			userId && !promotionId && !shopId
				? {
						userId: Number(userId)
				  }
				: userId && promotionId && !shopId
				? {
						userId: Number(userId),
						promotionId: Number(promotionId)
				  }
				: {
						userId: Number(userId),
						shopId: Number(shopId),
						promotionId: Number(promotionId)
				  };
		return await getDataSource().getRepository(PromotionCounter).findOneByOrFail(data);
	};

	/**
	 * Find promotionCounter by promotionId for the client / shop
	 * @param id - Id of the promotionCounter
	 * @returns A promotionCounter if found
	 */
	static findOneShop = async (shopId: number, userId: number, promotionId: number): Promise<PromotionCounter> => {
		const data =
			shopId && !userId && !promotionId
				? {
						shopId: Number(shopId)
				  }
				: shopId && userId && !promotionId
				? {
						shopId: Number(shopId),
						userId: Number(userId)
				  }
				: {
						shopId: Number(shopId),
						userId: Number(userId),
						promotionId: Number(promotionId)
				  };
		return await getDataSource().getRepository(PromotionCounter).findOneByOrFail(data);
	};

	/**
	 * Save a promotionCounter on the db
	 * @param promotionCounter - The promotionCounter to save
	 */
	static save = async (promotionCounter: PromotionCounter) => {
		await getDataSource().getRepository(PromotionCounter).save(promotionCounter);
	};

	/**
	 * Delete a promotionCounter from the db
	 * @param id - The id of the promotionCounter to delete
	 */
	static delete = async (id: number) => {
		await getDataSource().getRepository(PromotionCounter).delete(id);
	};
}
