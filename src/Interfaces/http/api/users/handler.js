const AddUserUseCase = require('../../../../Applications/use_case/Users/AddUserUseCase');
const GetUserUseCase = require('../../../../Applications/use_case/Users/GetUserUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
  }

  async getUsersHandler(request, h) {
    const getUserUseCase = this._container.getInstance(GetUserUseCase.name);
    const users = await getUserUseCase.execute(request.query);

    return h.response({
      status: 'success',
      data: users,
    });
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
