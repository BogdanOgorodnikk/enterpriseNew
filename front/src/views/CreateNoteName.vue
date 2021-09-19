<template>
  <div class="create-note">
    <CreateNoteList />
  </div>
</template>

<script>
import CreateNoteList from '../components/createtype/CreateNoteList'

export default {
  name: "CreateNote",
  components: {
    CreateNoteList
  }
}
</script>