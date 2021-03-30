function interviews (numberOfCandidates) {
  const candidates = []
  for (let i = 0; i < numberOfCandidates; i++) {
    candidates.push([`candidate${i + 1}`, Number((Math.random() * 100).toFixed(3))])
  }

  let baseline = Math.ceil(0.33 * candidates.length)

  // sort the baseline
  let baselineCandidates = candidates.slice(0, baseline).sort(function (a, b) { return b[1] - a[1] });
  let highestBaselineCandidates = baselineCandidates[0]

  // interview the rest of candidates
  let yourHiredCandidate = []
  for (let i = baseline; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (candidate[1] > highestBaselineCandidates[1]) {
      yourHiredCandidate = candidate
      break
    }
  }

  let sortedAllCandidates = [...candidates].sort(function (a, b) { return b[1] - a[1] });

  let rankOfYourHiredCandidate = 0
  for (let i = 0; i < sortedAllCandidates.length; i++) {
    const element = sortedAllCandidates[i];
    rankOfYourHiredCandidate ++
    if (element[0] == yourHiredCandidate[0]) break
  }

  console.log(candidates);
  console.log(sortedAllCandidates);
  console.log(highestBaselineCandidates);
  console.log(yourHiredCandidate);
  console.log(rankOfYourHiredCandidate);

  if (yourHiredCandidate.length !== 0) {
    return 1
  }
  return 0
}

interviews(20)

// let success = 0
// for (let i = 0; i < 10000; i++) {
//   success += interviews()
// }
// console.log(success);