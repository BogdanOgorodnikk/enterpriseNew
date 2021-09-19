<template>
    <div class="town-clients">
        <ClientsList />
    </div>
</template>

<script>
import ClientsList from '../components/towns/ClientsList'

export default {
    name: "TownClients",
    components: {
        ClientsList
    }
}
</script>