import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  SuccessResponse,
  Put,
  Delete,
} from "tsoa";
import { Card } from "../entities";
import {
  createCard,
  deleteCard,
  getCard,
  ICardPayload,
  updateCard,
} from "../repositories/card.repository";

@Route("wallet")
@Tags("Card")
export default class CardController {
  @Get("{id}")
  public async getCard(@Path() id: string): Promise<Card | null> {
    return getCard(Number(id));
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createCard(@Body() body: ICardPayload): Promise<Card> {
    return createCard(body);
  }

  @Put("{id}")
  public async updateCard(
    @Path() id: string,
    @Body() body: ICardPayload
  ): Promise<Card | null> {
    return updateCard(Number(id), body);
  }

  @Delete("{id}")
  public async deleteCard(@Path() id: string): Promise<Card | null> {
    return deleteCard(Number(id));
  }
}
