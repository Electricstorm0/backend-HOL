const LEADGetUsersUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/LEADGetUsersUseCase');
const UsersRepository = require('../../../../Domains/users/UsersRepository');

const users = [
  {
    key: LEADGetUsersUseCase.name,
    Class: LEADGetUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UsersRepository.name,
        },
      ],
    },
  },
];

module.exports = users;
