import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Balance } from '../balance/balance.entity';
import { Card } from '../card/card.entity';
import { Promotion } from '../promotion/promotion.entity';
import { Shop } from '../shop/shop.entity';
import { User } from '../user/user.entity';
import { Role } from '../user/user.enum';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Shop
      | typeof Card
      | typeof Promotion
      | typeof Balance
    >
  | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: any) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    can(Action.Manage, User, { uuid: user.uuid });

    if (user.role === Role.Fider) {
      can(Action.Create, [Shop, Promotion, Balance]);
      if (user.shop) {
        can([Action.Read, Action.Update, Action.Delete], Shop, {
          id: user.shop.id,
        });
        can([Action.Read, Action.Update, Action.Delete], [Card, Promotion], {
          shopId: user.shop.id,
        });
        can([Action.Read, Action.Update, Action.Delete], Balance, {
          'card.shop.id': user.shop.id,
        });
      }
    } else {
      can(Action.Create, Card);
      can(Action.Read, [Shop, Promotion], { isActive: true });
      can(Action.Read, Card, { isActive: true, userId: user.id });
      can(Action.Read, Balance, { isActive: true, 'card.user.id': user.id });
      cannot(
        [Action.Create, Action.Update, Action.Delete],
        [Shop, Promotion, Balance],
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
