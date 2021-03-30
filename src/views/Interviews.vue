<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-4">
        <h2>Input:</h2>
        <form>
          <div class="form-group">
            <label for="nInterviews">Number of Interviews</label>
            <input v-model="nInterviews" type="number" class="form-control" id="nInterviews" placeholder="Enter Number of Interviews">
          </div>
          <div class="form-group">
            <label for="nParticipant">Number of Participants Each Interview</label>
            <input v-model="nParticipant" type="number" class="form-control" id="nParticipant" placeholder="Enter Number of Participants Each Interview">
          </div>
          <div class="form-group">
            <label for="percentage">Percentage of Participants to be Interviewed for a Baseline Score</label>
            <input v-model="percentage" type="number" step="0.0000001" class="form-control" id="percentage" placeholder="Enter Percentage (in %)">
          </div>
        </form>
        <button type="button" class="btn btn-outline-success m-3" @click.prevent="() => interviews()">Interview</button>
      </div>
      <div class="col-8">
        <h2>Journals:</h2>
        <div class="justify-content-center">
          <div v-for="(message, index) in messages" :key="index" class=" d-flex justify-content-center">
            <div class="card col-8">
              <div class="card-body">
                {{message}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Interviews',
  data () {
    return {
      nInterviews: 0,
      nParticipant: 0,
      percentage: 0,
      messages: [],
      tries: 0
    }
  },
  methods: {
    interviews () {
      console.log('interviews () running')
      const nApplicants = this.nParticipant
      const perc = this.percentage / 100

      const output = []
      const nApplicantsBaseline = Math.floor(nApplicants * perc)
      const nextApplicants = nApplicants - nApplicantsBaseline

      // generate applicants
      const applicants = []
      const constant = Math.random() * 1000
      const baseMultiplier = Math.random() * 1000
      for (let i = 0; i < nApplicants; i++) {
        applicants.push([i + 1, (Math.random() * baseMultiplier) + constant])
      }

      // sorted applicants
      const sortedApplicants = [...applicants].sort(function (a, b) { return b[1] - a[1] })

      // interviews some of them to get the average/baseline score
      let applicantBaseline = [0, 0]
      for (let i = 0; i < nApplicantsBaseline; i++) {
        const applicant = applicants[i]
        if (applicant[1] > applicantBaseline[1]) {
          applicantBaseline = [applicant[0], applicant[1]]
        }
      }

      output.push(`You interviewed ${nApplicantsBaseline} applicants and the best applicant is no:${applicantBaseline[0]} with a score:${applicantBaseline[1]}. You set the score of this applicant for your baseline`)

      output.push(`You continue to interview the rest of ${nextApplicants} applicants, searching if there is someone with a score higher than your baseline`)

      let hiredApplicant = []
      for (let i = nApplicantsBaseline; i < applicants.length; i++) {
        const applicant = applicants[i]
        if (applicant[1] > applicantBaseline[1]) {
          hiredApplicant = applicant
          break
        }
      }

      if (hiredApplicant.length !== 0) {
        output.push(`After a while, you found an applicant with a higher score than no:${applicantBaseline[0]}. His name is no:${hiredApplicant[0]} with a score of ${hiredApplicant[1]}`, 'You hired him.')
        if (hiredApplicant[0] === sortedApplicants[0][0]) {
          output.push(`Success! Your hired applicant is the best applicant from ${applicants.length} applicants that applied`)
        } else {
          output.push(`Unfortunately, the best applicant is yet to come. He is applicant no:${sortedApplicants[0][0]} with a score of ${sortedApplicants[0][1]}`)
          output.push('You failed to hire the best applicant')
          output.push('You had only one job!')
        }
      } else {
        output.push(`Unfortunately, you found no one with a higher score than before. Your best applicant is what you interviewed earlier, applicant no:${applicantBaseline[0]} with a score of ${applicantBaseline[1]}.`, 'You had only one job!')
      }

      this.messages = output
    }
  }

}
</script>

<style>

</style>
