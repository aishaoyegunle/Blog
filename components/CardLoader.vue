<template>
  <div :class="`skelenton--${cardType}`"></div>
</template>

<script>
export default {
  props: {
    cardType:{
      type:String,
      default:'card'
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/components/_card.scss';
</style>