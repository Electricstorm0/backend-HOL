const InvariantError = require('../../../../../Commons/exceptions/InvariantError');
const HOLAddUsers = require('../../../../../Domains/program_main/hol/users/entities/HOLAddUsers');

class HOLCreateUsersUseCase {
  constructor({ usersRepository, usersDetailRepository, passwordHash, offeredProgramRepository, usersDomicileRepository, holUsersRepository, usersUniversitiesRepository, clpUsersRepository }) {
    this._usersRepository = usersRepository;
    this._usersDetailRepository = usersDetailRepository;
    this._passwordHash = passwordHash;
    this._offeredProgramRepository = offeredProgramRepository;
    this._holUsersRepository = holUsersRepository;
    this._usersDomicileRepository = usersDomicileRepository;
    this._usersUniversitiesRepository = usersUniversitiesRepository;
    this._clpUsersRepository = clpUsersRepository;
  }

  async splitName(fullname = '') {
    const [firstName, ...lastName] = fullname.split(' ').filter(Boolean);
    return {
      firstName: firstName || '',
      lastName: lastName.join(' '),
    };
  }

  async execute(payload) {
    const { fullname, email, password, thirdTierProgramId, batchId } = new HOLAddUsers(payload);
    const emailForUsername = email.split('@');
    const username = emailForUsername[0];
    const { firstName, lastName } = await this.splitName(fullname);
    const hashPassword = await this._passwordHash.hash(password);

    let usersId;
    const verifyHasEmail = await this._usersRepository.verifyAvailableEmail({ email });
    if (verifyHasEmail) {
      throw new InvariantError(`${fullname}, email anda ${email} sudah terdaftar!`);
    } else {
      const { id } = await this._usersRepository.create({
        username,
        email,
        password: hashPassword,
      });

      await this._usersDetailRepository.create({
        usersId: id,
        cardIdNumber: '-',
        firstName,
        lastName,
      });

      usersId = id;

      await this._offeredProgramRepository.create({
        usersId,
        statusAcceptanceProgramId: 4,
        thirdTierProgramId,
        roleId: 4,
        batchId,
      });

      await this._holUsersRepository.create({
        usersId,
        batchId,
      });
      await this._usersDomicileRepository.create({
        usersId,
        batchId,
        status: 'CURRENT',
      });
      await this._usersUniversitiesRepository.create({
        usersId,
        batchId,
      });

      if (thirdTierProgramId === 1 || thirdTierProgramId === 2 || thirdTierProgramId === 3) {
        await this._clpUsersRepository.create({
          usersId,
          batchId,
        });
      }
    }
    return {
      usersId,
      fullname,
      email,
    };
  }
}

module.exports = HOLCreateUsersUseCase;

// const InvariantError = require('../../../../../Commons/exceptions/InvariantError');
// const CLPAddUsers = require('../../../../../Domains/program_main/clp/users/entities/CLPAddUsers');

// class CLPAddUsersUseCase {
//   constructor({
//     usersRepository, usersDetailRepository, passwordHash,
//   }) {
//     this._usersRepository = usersRepository;
//     this._usersDetailRepository = usersDetailRepository;
//     this._passwordHash = passwordHash;
//   }

//   async splitName(fullname = '') {
//     const [firstName, ...lastName] = fullname.split(' ').filter(Boolean);
//     return {
//       firstName: firstName || '',
//       lastName: lastName.join(' '),
//     };
//   }

//   async execute(payload) {
//     const { fullname, email, password } = new CLPAddUsers(payload);
//     const emailForUsername = email.split('@');
//     const username = emailForUsername[0];
//     const { firstName, lastName } = await this.splitName(fullname);
//     const hashPassword = await this._passwordHash.hash(password);

//     let usersId;
//     const verifyHasEmail = await this._usersRepository.verifyAvailableEmail({ email });
//     if (verifyHasEmail) {
//       throw new InvariantError(`${fullname}, email anda ${email} sudah terdaftar!`);
//     } else {
//       const { id } = await this._usersRepository.create({
//         username,
//         email,
//         password: hashPassword,
//       });

//       await this._usersDetailRepository.create({
//         usersId: id,
//         numberCardId: null,
//         firstName,
//         lastName,
//         sex: null,
//         phoneNumber: null,
//         birthDate: null,
//         emergencyPhoneNumber: null,
//         relationshipEmergencyPhoneNumber: null,
//         socmedInstagram: null,
//         socmedTiktok: null,
//         socmedLinkedIn: null,
//         bankAccountNumber: null,
//         bankAccountName: null,
//         bankName: null,
//       });

//       usersId = id;
//     }

//     return {
//       usersId,
//       fullname,
//       email,
//     };
//   }
// }

// module.exports = CLPAddUsersUseCase;
