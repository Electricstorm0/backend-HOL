const { Mutex } = require('async-mutex');
const InvariantError = require('../../../../../../Commons/exceptions/InvariantError');

const recordLock = new Mutex();

class CLPPostEvaluationsPATUsersUseCase {
  constructor({
    cLPEvaluationsFinalRepository, cLPEvaluationsPATRepository,
    cLPEvaluationsPATFinalRepository, cLPEvaluationsPATScoreRepository,
    cLPEvaluationsFinalBCFRepository, cLPRefreshEvaluationsFinalUseCase,
  }) {
    this._cLPEvaluationsFinalRepository = cLPEvaluationsFinalRepository;
    this._cLPEvaluationsPATRepository = cLPEvaluationsPATRepository;
    this._cLPEvaluationsPATFinalRepository = cLPEvaluationsPATFinalRepository;
    this._cLPEvaluationsPATScoreRepository = cLPEvaluationsPATScoreRepository;
    this._cLPEvaluationsFinalBCFRepository = cLPEvaluationsFinalBCFRepository;
    this._cLPRefreshEvaluationsFinalUseCase = cLPRefreshEvaluationsFinalUseCase;
  }

  async execute({ id: usersId }, { id: usersCLPId }, { note, evaluated = [] }) {
    if (parseInt(usersId, 10) === parseInt(usersCLPId, 10)) {
      throw new InvariantError('Anda tidak bisa menilai diri sendiri!');
    }

    let evaluationTotal = 0;
    evaluated.forEach((value) => {
      evaluationTotal += parseInt(value.evaluation, 10);
    });
    const evaluationAverage = evaluationTotal / evaluated.length;

    await this._cLPEvaluationsFinalRepository.verifyUsersHasAssigned({ id: usersCLPId });
    await this._cLPEvaluationsPATRepository.verifyUsersHasAssigned({ id: usersCLPId });
    const hasEvaluated = await this._cLPEvaluationsPATFinalRepository.readUsersHasEvaluated({ usersId, usersIdHasEvaluated: usersCLPId });
    if (hasEvaluated) throw new InvariantError('Anda sudah menilai!');

    const finalEvaluationPATId = await this._cLPEvaluationsPATFinalRepository.create({
      usersId, note, evaluationTotal, evaluationAverage, usersCLPId,
    });

    evaluated.forEach(async (value) => {
      const lock = await recordLock.acquire();
      try {
        const { classificationId, evaluation } = value;
        await this._cLPEvaluationsPATScoreRepository.create({
          classificationId,
          evaluation,
          finalEvaluationPATId,
        });
      } finally {
        lock();
      }
    });

    const {
      finalEvaluationAverage,
      finalEvaluationTotal,
    } = await this._cLPEvaluationsPATFinalRepository.readEvaluatedByEvaluationsPATId({ id: usersCLPId });

    await this._cLPEvaluationsPATRepository.update({
      evaluationTotal: finalEvaluationTotal,
      evaluationAverage: finalEvaluationAverage,
      id: usersCLPId,
    });

    await this._cLPEvaluationsFinalBCFRepository.updatePATEvaluations({
      evaluationTotal: finalEvaluationTotal,
      finalEvaluationsId: usersCLPId,
    });

    await this._cLPRefreshEvaluationsFinalUseCase.execute({ id: usersCLPId });

    return { usersId, usersCLPId };
  }
}

module.exports = CLPPostEvaluationsPATUsersUseCase;
