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
    const user = await this.service.findOne(uuid);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!(await this.service.findOne(uuid))) {
      throw new NotFoundException();
    }

    await this.service.update(uuid, updateUserDto);
    return { message: 'User updated' };
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    if (!(await this.service.findOne(uuid))) {
      throw new NotFoundException();
    }

    await this.cardService.removeUsersCards(uuid);
    await this.service.remove(uuid);
    return { message: 'User deleted' };
  }
}
