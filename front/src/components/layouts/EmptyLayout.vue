<template>
    <div>
        <EmptyHeader />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import EmptyHeader from '../app/EmptyHeader'

export default {
    name: "EmptyLayout",
    components: {
        EmptyHeader
    }
}
</script>