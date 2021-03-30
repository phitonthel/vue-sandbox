<template>
  <div class="card col-3">
    <div class="card-body">
      {{candidate[0]}}: {{candidate[1]}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CandidateCard',
  props: ['candidate']
}
</script>

<style>

</style>
