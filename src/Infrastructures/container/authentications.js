const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const PasswordHash = require('../../Applications/security/PasswordHash');
const LoginAdminUseCase = require('../../Applications/use_case/Authentication/LoginAdminUseCase');
const LoginUserUseCase = require('../../Applications/use_case/Authentication/LoginUserUseCase');
const LogoutUserUseCase = require('../../Applications/use_case/Authentication/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../../Applications/use_case/Authentication/RefreshAuthenticationUseCase');
const GetOfferedProgramCurrentActiveUseCase = require('../../Applications/use_case/Program/Offered_Program/GetOfferedProgramCurrentActiveUseCase');
const AuthenticationRepository = require('../../Domains/authentications/AuthenticationRepository');
const MasterEmployeesBCFRepository = require('../../Domains/bcf/MasterEmployeesBCFRepository');
const UsersBCFRepository = require('../../Domains/bcf/UsersBCFRepository');
const UsersRepository = require('../../Domains/users/UsersRepository');

const authentication = [
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersRepository',
          internal: UsersRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'getOfferedProgramCurrentActiveUseCase',
          internal: GetOfferedProgramCurrentActiveUseCase.name,
        },
      ],
    },
  },
  {
    key: LoginAdminUseCase.name,
    Class: LoginAdminUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersBCFRepository',
          internal: UsersBCFRepository.name,
        },
        {
          name: 'masterEmployeesBCFRepository',
          internal: MasterEmployeesBCFRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'getOfferedProgramCurrentActiveUseCase',
          internal: GetOfferedProgramCurrentActiveUseCase.name,
        },
      ],
    },
  },
];

module.exports = authentication;
