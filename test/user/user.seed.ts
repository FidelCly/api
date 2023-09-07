import { CreateUserDto, UpdateUserDto } from '../../src/user/user.dto';

export const userFixture: CreateUserDto = {
  username: 'alice',
  email: 'alice@example.com',
  uuid: 'some-uuid',
};

export const userFixture2: CreateUserDto = {
  username: 'bob',
  email: 'bob@example.com',
  uuid: 'some-other-uuid',
};

export const modifiedUserFixture: UpdateUserDto = {
  username: 'testUsernameModified',
};

export const emptyModifiedUserFixture: UpdateUserDto = {
  username: '',
};
