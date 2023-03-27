import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ShopService } from '../shop/shop.service';
import { UserService } from '../user/user.service';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { CardService } from './card.service';

@Controller('card')
@UseGuards(AuthGuard)
export class CardController {
  constructor(
    private service: CardService,
    private shopService: ShopService,
    private userService: UserService,
  ) {}

  @Get(':id')
  async one(@Param('id') id: string) {
    const card = await this.service.findOne(+id);
    if (!card) throw new NotFoundException();
    return card;
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    if (!(await this.userService.findOne(createCardDto.userId))) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.shopService.findOne(createCardDto.shopId))) {
      throw new NotFoundException('Shop not found');
    }

    return this.service.create(createCardDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.service.update(+id, updateCardDto);
    return { message: 'Card updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.service.remove(+id);
    return { message: 'Card deleted' };
  }
}
