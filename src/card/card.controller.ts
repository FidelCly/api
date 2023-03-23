import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCardDto, UpdateCardDto } from './card.dto';

@Controller('card')
export class CardController {
  @Get(':id')
  async one(@Param('id') id: string) {
    return `This action finds a balance`;
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return `This action creates a balance`;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} balance`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `This action removes a #${id} balance`;
  }
}
