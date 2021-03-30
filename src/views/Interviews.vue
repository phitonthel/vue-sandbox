<template>
  <div>

    <div class="btn btn-primary" @click.prevent="() => {interview(20)}">Interview</div>

    <h2>highestBaselineCandidates: {{highestBaselineCandidates}}</h2>
    <h2>yourHiredCandidate: {{yourHiredCandidate}}</h2>
    <h2>rankOfYourHiredCandidate: {{rankOfYourHiredCandidate}}</h2>

    <h4>All Candidates</h4>
    <div class="row">
      <CandidateCard
        v-for="(candidate, index) in candidates"
        :key="index"
        :candidate="candidate"
        />
    </div>

    <h4>Sorted Candidates</h4>
    <div class="row">
      <CandidateCard
        v-for="(candidate, index) in sortedAllCandidates"
        :key="index"
        :candidate="candidate"
        />
    </div>

  </div>
</template>

<script>
import CandidateCard from '../components/CandidateCard'

export default {
  name: 'Interviews',
  components: {
    CandidateCard
  },
  data () {
    return {
      candidates: [],
      sortedAllCandidates: [],
      highestBaselineCandidates: '',
      yourHiredCandidate: '',
      rankOfYourHiredCandidate: ''
    }
  },
  methods: {
    sandboxMethods () {
      let test = 0
      for (let index = 0; index < 10; index++) {
        test++
      }
      return test
    },
    interview (numberOfCandidates) {
      const candidates = []
      for (let i = 0; i < numberOfCandidates; i++) {
        candidates.push([`candidate${i + 1}`, Number((Math.random() * 100).toFixed(3))])
      }

      const baseline = Math.ceil(0.33 * candidates.length)

      // sort the baseline
      const baselineCandidates = candidates.slice(0, baseline).sort(function (a, b) { return b[1] - a[1] })
      const highestBaselineCandidates = baselineCandidates[0]

      // interview the rest of candidates
      let yourHiredCandidate = []
      for (let i = baseline; i < candidates.length; i++) {
        const candidate = candidates[i]
        if (candidate[1] > highestBaselineCandidates[1]) {
          yourHiredCandidate = candidate
          break
        }
      }

      const sortedAllCandidates = [...candidates].sort(function (a, b) { return b[1] - a[1] })

      let rankOfYourHiredCandidate = 0
      for (let i = 0; i < sortedAllCandidates.length; i++) {
        const element = sortedAllCandidates[i]
        rankOfYourHiredCandidate++
        if (element[0] === yourHiredCandidate[0]) break
      }

      this.candidates = candidates
      this.sortedAllCandidates = sortedAllCandidates
      this.highestBaselineCandidates = highestBaselineCandidates
      this.yourHiredCandidate = yourHiredCandidate
      this.rankOfYourHiredCandidate = rankOfYourHiredCandidate

      // console.log(candidates);
      // console.log(sortedAllCandidates);
      // console.log(highestBaselineCandidates);
      // console.log(yourHiredCandidate)
      // console.log('rankOfYourHiredCandidate=', rankOfYourHiredCandidate)
    }
  }
}
</script>

<style>

</style>
