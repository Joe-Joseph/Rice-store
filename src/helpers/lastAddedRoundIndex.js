import model from '../models';

const { rounds } = model;

const findLastRoundId = async () => {
  const allRounds = await rounds.findAll();
  const lastRoundIndex = allRounds.length - 1;

  return allRounds[lastRoundIndex].roundId;
};

export default findLastRoundId;
