<template>
  <div class="container">
    <main class="article">
      <p>
        <span class="article--author">By {{article._embedded.author[0].name}}</span>
        <span class="article--separator">&#8226;</span>
        <span class="article--release">{{ article && dateFormatter(article.date) }}</span>
      </p>
      <h2 class="article--title" v-html="article && article.title.rendered"></h2>
      <article class="article--content" v-html="article && article.content.rendered"></article>
    </main>

    <section v-if="getRelatedPosts.length" class="related">
      <h3 class="related__title">More Articles</h3>
      <div class="related__articles">
        <template v-for="post in getRelatedPosts" >
          <Card :key="post.id" :post="post" />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import axios from 'axios'
import dateFormatter from '~/mixins/dateFormatter'

export default {
  components: {
    Card: () => import('@/components/Card.vue'),
  },
  mixins: [dateFormatter],
  async asyncData({ params }) {
    const slug = params.slug.split('-')
    const id = slug[slug.length - 1]
    const article = await axios.get(
      `https://techcrunch.com/wp-json/wp/v2/posts/${id}?_embed=1`
    ).then((res) => res.data)
    return { article }
  },
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters(['getRelatedPosts']),
  },
  async mounted() {
    this.$store.dispatch("fetchAllPosts");
    const payload = {category:this.article.categories[0],id:parseInt(this.article.id)}
    await this.fetchRelatedPost(payload)
  },
  methods:{
    ...mapActions(['fetchRelatedPost'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/_blogdetails.scss';
</style>

<style lang="scss">
.article--content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .wp-caption{
    width: 100%;
    max-width: 350px;
    align-self: center;
  }
  .wp-caption-text{
    width: 100%;
    max-width: 350px;
    margin-bottom: $gap*2;
  }
  img {
    width: 100%;
    max-width: 350px;
    height: auto;
    object-fit: contain;
    border-radius: 5px;
    margin: $gap*2 auto;
  } 
   @include respond(md) {
    .wp-caption,.wp-caption-text,img{
      max-width: 500px;
    }
  }
}
</style>