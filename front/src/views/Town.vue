<template>
  <div class="town">
    <TownList />
  </div>
</template>

<script>
import TownList from '../components/towns/TownList'

export default {
  name: 'Town',
  components: {
    TownList
  }
}
</script>
