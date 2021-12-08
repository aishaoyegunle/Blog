<template>
  <div class="container">
    <header class="hero">
      <div class="hero__img" >
        <img :src="require(`~/assets/images/card-img.png`)" alt="image" />
      </div>
      <div class="hero__content">
        <p class="hero__content--top"><span class="hero__content--category">{{featuredPost && featuredPost._embedded['wp:term'][0][0].name}}</span><span class="hero__content--separator">&#8226;</span><span class="hero__content--release">{{ featuredPost && dateFormatter(featuredPost.date) }}</span></p>
        <h5 class="hero__content--title" v-html="featuredPost && featuredPost.title.rendered"></h5>
        <p class="hero__content--desc" v-html="featuredPost && featuredPost.excerpt.rendered"></p>
        <div v-if="featuredPost" class="hero__content--footer">
          <p>3 Min Read</p>
          <nuxt-link
            :to="{
              name: 'slug',
              params: { slug: featuredPost.slug + '-' + featuredPost.id },
            }"
            class="hero__content--link"
          >
            <span>Read Full</span>
            <img :src="require(`~/assets/images/arrow-forward.svg`)" alt="read full" class="" />
          </nuxt-link>
        </div>
      </div>
    </header>

    <main>
      <div class="posts">
        <template v-for="post in getAllPosts">
          <Card :key="post.id" :post='post'/>
        </template>
      </div>
      <button class="btn--solid posts--btn" @click="loadMore()">LOAD MORE</button>
    </main>
    
    <footer class="footer">
      <h2>Join our Team of Writers</h2>
      <p>On dasdas, writers earn a living doing what they love. 
       <br/>
       Getting started is easy. Just pay a one time <b>$25 fee</b> and everything is ready to go.
      </p>
      <button class="btn--solid">JOIN US</button>
    </footer>

  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import dateFormatter from '~/mixins/dateFormatter'

export default {
  components: {
    Card: () => import('@/components/Card.vue'),
  },
  mixins: [dateFormatter],
  data(){
    return{
      currentPage:1
    }
  },
  computed: {
    ...mapGetters(['getAllPosts']),
    featuredPost(){
     return this.getAllPosts[0]
    }
  },
  created() {
    this.fetchAllPosts()
  },
  methods:{
    ...mapActions(['fetchAllPosts','updateAllPosts']),
    loadMore(){
      this.currentPage+=1
      const payload = this.currentPage;
      this.updateAllPosts(payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/_index.scss';
</style>