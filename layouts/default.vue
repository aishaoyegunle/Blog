<template>
  <div class="layout">
    <Navigation />
    <Nuxt />
  </div>
</template>

<script>
export default {
  components: {
    Navigation: () => import('@/components/Navigation.vue'),
  },
}
</script>

<style lang="scss" scoped>
</style>