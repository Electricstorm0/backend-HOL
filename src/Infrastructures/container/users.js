const PasswordHash = require('../../Applications/security/PasswordHash');
const AddUserUseCase = require('../../Applications/use_case/Users/AddUserUseCase');
const GetUserUseCase = require('../../Applications/use_case/Users/GetUserUseCase');
const UserRepository = require('../../Domains/users/UsersRepository');

const users = [
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: GetUserUseCase.name,
    Class: GetUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
];

module.exports = users;
