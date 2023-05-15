import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { Action, AppAbility, Subjects } from '../src/auth/ability.factory';

@Injectable()
export class AbilityFactoryMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defineAbility(user: any) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can(Action.Manage, 'all');

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
