function interviews (nApplicants, perc) {
  const output = []
  const nApplicantsBaseline = Math.floor(nApplicants * perc)
  const nextApplicants = nApplicants - nApplicantsBaseline

  // generate applicants
  const applicants = []
  const baseMultiplier = Math.random() * 1000
  for (let i = 0; i < nApplicants; i++) {
    applicants.push([i + 1, Math.random() * baseMultiplier])
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

  output.push(`You interviewed ${nApplicantsBaseline} applicants and the best applicant is no:${applicantBaseline[0]} score:${applicantBaseline[1]}`)

  output.push(`You continue to interview the rest of ${nextApplicants} applicants, searching if there is someone with a score higher than before`)

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
}