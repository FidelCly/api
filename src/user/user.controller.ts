import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CardService } from '../card/card.service';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private service: UserService, private cardService: CardService) {}

  @Get(':uuid')
  async one(@Param('uuid') uuid: string) {
    const user = await this.service.findByUuid(uuid);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.service.update(+id, updateUserDto);
    return { message: 'User updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!(await this.service.findOne(+id))) {
      throw new NotFoundException();
    }

    await this.cardService.removeUsersCards(+id);
    await this.service.remove(+id);
    return { message: 'User deleted' };
  }
}
