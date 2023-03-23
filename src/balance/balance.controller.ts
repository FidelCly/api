import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateBalanceDto, UpdateBalanceDto } from './balance.dto';

@Controller('balances')
export class BalanceController {
  @Get(':id')
  async one(@Param('id') id: string) {
    return `This action finds a balance`;
  }

  @Post()
  async create(@Body() createBalanceDto: CreateBalanceDto) {
    return `This action creates a balance`;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ) {
    return `This action updates a #${id} balance`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `This action removes a #${id} balance`;
  }
}
