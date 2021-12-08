<template>
  <div class="container">
    <header v-if="Object.keys(getFeaturedPost).length" class="hero">
      <div class="hero__img" >
        <img :src="getFeaturedPost.jetpack_featured_media_url"  :alt="getFeaturedPost.title.rendered"/> 
      </div>
      <div class="hero__content">
        <p class="hero__content--top">
          <span class="hero__content--category" v-html="getFeaturedPost._embedded['wp:term'][0][0].name"></span>
          <span class="hero__content--separator">&#8226;</span><span class="hero__content--release">{{ dateFormatter(getFeaturedPost.date) }}</span>
        </p>
        <h5 class="hero__content--title" v-html="getFeaturedPost.title.rendered"></h5>
        <p class="hero__content--desc" v-html="getFeaturedPost.excerpt.rendered"></p>
        <div class="hero__content--footer">
          <!-- TODO: dynamically determine the average read time based on number of words-->
          <p>3 Min Read</p>
          <nuxt-link
            :to="{
              name: 'slug',
              params: { slug: getFeaturedPost.slug + '-' + getFeaturedPost.id },
            }"
            class="hero__content--link"
          >
            <span>Read Full</span>
            <img :src="require(`~/assets/images/arrow-forward.svg`)" alt="read full" class="" />
          </nuxt-link>
        </div>
      </div>
    </header>
    <header v-else>
      <CardLoader />
    </header>
    <main>
      <div v-if="getAllPosts.length" class="posts">
        <template v-for="post in getAllPosts">
          <Card :key="post.id" :post='post' />
        </template>
      </div>
      <div v-else class="posts">
        <template v-for="item in 12">
          <CardLoader :key="item" :card-type="'card'" />
        </template>
      </div>
      <button v-if="getAllPosts.length" class="btn--solid posts--btn" :class="{ 'is-loading': isLoading }" @click="loadMore()">
        {{isLoading ?'LOADING':'LOAD MORE'}}
      </button>
    </main>
    
    <footer class="footer">
      <h2>Join our Team of Writers</h2>
      <p>On dasdas, writers earn a living doing what they love. 
       <br/>
       Getting started is easy. Just pay a one time <b>$25 fee</b> and everything is ready to go.
      </p>
      <FlutterwavePayment/>
    </footer>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import dateFormatter from '~/mixins/dateFormatter'
export default {
  components: {
    Card: () => import('@/components/Card.vue'),
    CardLoader: () => import('@/components/CardLoader.vue'),
    FlutterwavePayment: () => import('@/components/FlutterwavePayment.vue'),
  },
  mixins: [dateFormatter],
  data(){
    return{
      currentPage:1,
      isLoading:false,
    }
  },
  computed: {
    ...mapGetters(['getAllPosts','getFeaturedPost']),
  },
  created() {
    this.fetchAllPosts()
  },
  methods:{
    ...mapActions(['fetchAllPosts','updateAllPosts']),
    async loadMore(){
      this.isLoading= true
      this.currentPage+=1
      const payload = this.currentPage;
      await this.updateAllPosts(payload)
      this.isLoading= false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/_index.scss';
</style>