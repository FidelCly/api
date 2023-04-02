import { CreateUserDto, UpdateUserDto } from '../../src/user/user.dto';

export const userFixture: CreateUserDto = {
  username: 'test',
  email: 'test@example.com',
  uuid: 'some-uuid',
};

export const modifiedUserFixture: UpdateUserDto = {
  username: 'testUsernameModified',
};

export const emptyModifiedUserFixture: UpdateUserDto = {
  username: '',
};
