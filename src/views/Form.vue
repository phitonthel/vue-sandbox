<template>
  <div>
    <div class="d-flex justify-content-center">
      <form class="col-4">
        <div class="form-group">
          <label for="contact">Contact</label>
          <input v-model="contact" type="text" class="form-control" id="nParticipant" placeholder="Where can I reach you?">
        </div>
        <div class="form-group">
          <label for="answer">Your Answer</label>
          <input v-model="answer" type="number" step="0.01" class="form-control" id="percentage" placeholder="Enter Percentage (in %)">
        </div>
      </form>
    </div>
    <button type="button" class="btn btn-outline-success m-3" @click.prevent="() => submit()">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Form',
  data () {
    return {
      contact: '',
      answer: 0
    }
  },
  methods: {
    submit () {
      const payload = {
        contact: this.contact,
        answer: Number(this.answer)
      }
      console.log(payload)
      if (!payload.contact || !payload.answer) {
        Swal.fire({
          title: 'Error!',
          text: 'Please fill all the form buddy! Otherwise my server is gonna be blown :(',
          icon: 'error'
        })
        return
      }
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users',
        data: payload
      })
        .then((response) => {
          Swal.fire({
            title: 'Success!',
            text: response.data.message + '! I\'ll get back to you if your answer is the closest.',
            icon: 'success'
          })
          this.contact = ''
          this.answer = 0
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            title: 'Error!',
            text: 'Sorry, something went wrong! ',
            icon: 'error'
          })
        })
    }
  }
}
</script>

<style>

</style>
