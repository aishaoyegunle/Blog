<template>
  <div id="nav--container" class="container">
    <nav class="navigation">
      <nuxt-link :to="{ path: '/' }" class="navigation__logo">
        <img :src="require(`~/assets/images/logo.svg`)" alt="dasdas" />
      </nuxt-link>
      <ul class="navigation__menu">
        <li class="navigation__menu--item"><img :src="require(`~/assets/images/twitter.svg`)" alt="twitter" /></li>
        <span class="navigation__menu--separator">&#8226;</span>
        <li class="navigation__menu--item"><img :src="require(`~/assets/images/dribble.svg`)" alt="dribble" /></li>
        <span class="navigation__menu--separator">&#8226;</span>
        <li class="navigation__menu--item"><img :src="require(`~/assets/images/figma.svg`)" alt="figma" /></li>
        <span class="navigation__menu--separator">&#8226;</span>
        <li class="navigation__menu--item"><img :src="require(`~/assets/images/github.svg`)" alt="github" /></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
 mounted() {
    window.addEventListener('scroll', this.handleScroll)
 },
 methods:{
   handleScroll() {
    if (window.scrollY > 20) {
      document.querySelector('#nav--container').className =
        'container scroll'
    } else {
      document.querySelector('#nav--container').className = 'container'
    }
  }
 }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_navigation.scss';
</style>