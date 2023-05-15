import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CardService } from '../card/card.service';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { ShopService } from '../shop/shop.service';
import { AbilityFactory, Action } from '../auth/ability.factory';
import { Request } from 'express';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private service: UserService,
    private cardService: CardService,
    private shopService: ShopService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Get(':uuid')
  async one(@Param('uuid') uuid: string, @Req() req: Request) {
    const user = await this.service.findByUuid(uuid);
    if (!user) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Read, user)) throw new ForbiddenException();

    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const user = await this.service.findOne(+id);
    if (!user) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Update, user)) throw new ForbiddenException();

    await this.service.update(+id, updateUserDto);
    return { message: 'User updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = await this.service.findOne(+id);
    if (!user) throw new NotFoundException();

    const ability = this.abilityFactory.defineAbility(req['currentUser']);
    if (!ability.can(Action.Delete, user)) throw new ForbiddenException();

    await this.shopService.removeUsersShop(+id);
    await this.cardService.removeUsersCards(+id);
    await this.service.remove(+id);
    return { message: 'User deleted' };
  }
}
