import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { PromotionCounter } from "../entities/promotion-counter";
import { PromotionCounterRepository, PromotionRepository } from "../repositories";
import { TypePromotion } from "../shared/enums/type-promotion";

export class PromotionCounterController {
	/**
	 * Get one promotion by promotion id for user
	 */
	static oneByUser = async (req: Request, res: Response) => {
		const shopId = Number(req.params.shopId);
		const userId = Number(req.params.userId);
		const promotionId = Number(req.params.promotionId);

		try {
			const promotion = await PromotionCounterRepository.findOneUser(userId, shopId, promotionId);
			res.status(200).send(promotion);
		} catch (error) {
			res.status(404).send({ message: "Promotion not found" });
		}
	};

	/**
	 * Get one promotion by promotion id for user
	 */
	static oneByClient = async (req: Request, res: Response) => {
		const shopId = Number(req.params.shopId);
		const userId = Number(req.params.userId);
		const promotionId = Number(req.params.promotionId);

		try {
			const promotion = await PromotionCounterRepository.findOneUser(userId, shopId, promotionId);
			res.status(200).send(promotion);
		} catch (error) {
			res.status(404).send({ message: "Promotion not found" });
		}
	};

	/**
	 * Create promotion counter
	 */
	static create = async (req: Request, res: Response) => {
		// const payload: IPromotionCreatePayload = <IPromotionCreatePayload>req.body;
		const userId = parseInt(req.params.userId);
		const shopId = parseInt(req.params.shopId);
		const promotionId = parseInt(req.params.promotionId);

		// console.log("🚀 ~ PromotionCounterController ~ create= ~ promotionCounter", promotionCounter);
		const promotionCounter = new PromotionCounter();

		try {
			// const promotion  = await PromotionRepository.findOneById(promotionId);
			// const user = await UserRepository.findOneById(userId);
			// const shop = await ShopRepository.findOneById(shopId);

			promotionCounter.shopId = shopId;
			promotionCounter.userId = userId;
			promotionCounter.promotionId = promotionId;
			promotionCounter.increment = 0;
			promotionCounter.isActive = true;
			promotionCounter.nbValidation = 0;
			promotionCounter.createAt = new Date();
			promotionCounter.updatedAt = new Date();

			await validateOrReject(promotionCounter);
		} catch (errors) {
			res.status(400).send({ message: "Validation failed", errors });
			return;
		}

		try {
			await PromotionCounterRepository.save(promotionCounter);
			res.status(201).send({ message: "Promotion created" });
		} catch (error) {
			res.status(400).send({ message: error });
		}
	};

	/**
	 * Update promotion counter
	 */
	static update = async (req: Request, res: Response) => {
		try {
			const promotionId = Number(req.params.id);
			const shopId = Number(req.params.shopId);
			const userId = Number(req.params.userId);

			const [promotion, promotionCounter] = await Promise.all([
				PromotionRepository.findOneById(promotionId),
				PromotionCounterRepository.findOneShop(shopId, userId, promotionId)
			]);

			if (!promotion) res.status(400).send({ message: `promotion with id '${promotionId}' not found` });

			if (!promotionCounter)
				res.status(400).send({ message: `promotionCounter with id '${promotionId}' not found` });

			console.log("🚀 ~ PromotionCounterController ~ update= ~ promotionCounter", promotionCounter);
			console.log("🚀 ~ PromotionCounterController ~ update= ~ promotion", promotion);

			if (promotion.type === TypePromotion.AMOUNT) {
				if (promotionCounter.increment < promotion.limitAmout) {
					promotionCounter.increment += 1;
					if (promotionCounter.increment === promotion.limitAmout) {
						promotionCounter.increment = 0;
						promotionCounter.nbValidation += 1;
						res.status(200).send({ message: "Promotion validated" });
					}
					res.status(200).send({ message: "Promotion incremented" });
				} else {
					res.status(400).send({ message: "Promotion not incremented" });
				}
			} else if (promotion.type === TypePromotion.PASSAGE) {
				if (promotionCounter.increment < promotion.limitPassage) {
					promotionCounter.increment += 1;
					if (promotionCounter.increment === promotion.limitAmout) {
						promotionCounter.increment = 0;
						promotionCounter.nbValidation += 1;
						res.status(200).send({ message: "Promotion validated" });
					}
					res.status(200).send({ message: "Promotion incremented" });
				} else {
					res.status(400).send({ message: "Promotion not incremented" });
				}
			} else {
				// TODO: implement percentage
				res.status(200).send({ message: "Promotion percentage not implemented yet" });
			}
			await validateOrReject(promotionCounter);
			await PromotionCounterRepository.save(promotionCounter);
		} catch (error) {
			res.status(404).send({ message: "Error while updating promotion counter : ", error });
		}
	};

	/**
	 * Delete promotion
	 */
	static delete = async (req: Request, res: Response) => {
		const id = Number(req.params.id);

		try {
			await PromotionRepository.findOneById(id);
		} catch (error) {
			res.status(404).send({ message: "Promotion not found" });
			return;
		}

		await PromotionRepository.delete(id);
		res.status(200).send({ message: "Promotion deleted" });
	};
}
