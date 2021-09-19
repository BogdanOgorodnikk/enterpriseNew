<template>
    <div class="create-town" v-if="user.role_id == 1 || user.role_id == 2">
        <CreateTownList />
    </div>
</template>

<script>
import CreateTownList from '../components/createtype/CreateTownList'

export default {
    name: "CreateTown",
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        CreateTownList
    }
}
</script>