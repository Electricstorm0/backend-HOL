const GetOfferedProgramByUsersUseCase = require('../../Applications/use_case/Program/Offered_Program/GetOfferedProgramByUsersUseCase');
const GetOfferedProgramCurrentActiveUseCase = require('../../Applications/use_case/Program/Offered_Program/GetOfferedProgramCurrentActiveUseCase');
const MasterBatchRepository = require('../../Domains/batch/MasterBatchRepository');
const MasterProgramRoleRepository = require('../../Domains/program/MasterProgramRoleRepository');
const OfferedProgramRepository = require('../../Domains/program/OfferedProgramRepository');
const GetProgramThirdTierByUsersAndBatch = require('../../Applications/use_case/Program/Program_Tier/GetProgramThirdTierByUsersAndBatch');
const GetProgramSecondTierByUsersAndBatch = require('../../Applications/use_case/Program/Program_Tier/GetProgramSecondTierByUsersAndBatch');
const MasterProgramThirdTierRepository = require('../../Domains/program/program_tier/MasterProgramThirdTierRepository');
const usecase = [
  {
    key: GetOfferedProgramByUsersUseCase.name,
    Class: GetOfferedProgramByUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'offeredProgramRepository',
          internal: OfferedProgramRepository.name,
        },
        {
          name: 'masterBatchRepository',
          internal: MasterBatchRepository.name,
        },
      ],
    },
  },
  {
    key: GetOfferedProgramCurrentActiveUseCase.name,
    Class: GetOfferedProgramCurrentActiveUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'masterBatchRepository',
          internal: MasterBatchRepository.name,
        },
        {
          name: 'offeredProgramRepository',
          internal: OfferedProgramRepository.name,
        },
        {
          name: 'masterProgramRoleRepository',
          internal: MasterProgramRoleRepository.name,
        },
      ],
    },
  },
  {
    key: GetProgramThirdTierByUsersAndBatch.name,
    Class: GetProgramThirdTierByUsersAndBatch,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'offeredProgramRepository',
          internal: OfferedProgramRepository.name,
        },
        {
          name: 'masterProgramThirdTierRepository',
          internal: MasterProgramThirdTierRepository.name,
        },
      ],
    },
  },
  {
    key: GetProgramSecondTierByUsersAndBatch.name,
    Class: GetProgramSecondTierByUsersAndBatch,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'offeredProgramRepository',
          internal: OfferedProgramRepository.name,
        },
        {
          name: 'masterProgramThirdTierRepository',
          internal: MasterProgramThirdTierRepository.name,
        },
      ],
    },
  },
];

module.exports = usecase;
