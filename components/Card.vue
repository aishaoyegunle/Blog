<template>
  <div class="card">
    <div class="card__img" >
        <!-- <img :src="post.jetpack_featured_media_url" alt="image" /> -->
        <img :src="require(`~/assets/images/card-img.png`)" alt="image" />
    </div>
    <div class="card__content">
      <p class="card__content--top">
        <span class="card__content--category">{{post._embedded['wp:term'][0][0].name}}</span>
        <span class="card__content--separator">&#8226;</span>
        <span class="card__content--release">{{ dateFormatter(post.date) }}</span>
      </p>
      <h5 class="card__content--title" v-html="post.title.rendered"></h5>
      <p class="card__content--desc" v-html="post.excerpt.rendered"></p>
      <div class="card__content--footer">
        <p>3 Min Read</p>
         <nuxt-link
            :to="{
              name: 'slug',
              params: { slug: post.slug + '-' + post.id },
            }"
            class="card__content--link"
          >
          <span>Read Full</span>
          <img :src="require(`~/assets/images/arrow-forward.svg`)" alt="read full" class="" />
         </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from '~/mixins/dateFormatter'

export default {
  mixins: [dateFormatter],
  props:{
    post: {
      type: Object,
      required: true
    },
 },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_card.scss';
</style>