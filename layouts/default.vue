<template>
  <div>
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
