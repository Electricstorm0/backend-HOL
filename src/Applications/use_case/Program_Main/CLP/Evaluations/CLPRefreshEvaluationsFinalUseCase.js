class CLPRefreshEvaluationsFinalUseCase {
  constructor({
    cLPEvaluationsFinalRepository,
  }) {
    this._cLPEvaluationsFinalRepository = cLPEvaluationsFinalRepository;
  }

  async execute({ id }) {
    try {
      const evaluated = await this._cLPEvaluationsFinalRepository.readEvaluationsByEvaluationsFinalId({ id });
      if (!evaluated.length < 1) {
        const averageEvaluation = evaluated[0].evaluationTotal / 10; // TOTAL KPI
        const totalEvaluation = evaluated[0].evaluationTotal;
        await this._cLPEvaluationsFinalRepository.update({ totalEvaluation, averageEvaluation, id });
      } else {
        console.log(`Mentor dari CLP ID:${id} masih belum menilai!, DATETIME: ${new Date()}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CLPRefreshEvaluationsFinalUseCase;
