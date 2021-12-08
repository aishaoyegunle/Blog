/* eslint-disable camelcase */
export const state = () => ({
  allPosts: [],
  featuredPost:{},
  isLoading:false
})

export const getters = {
  getAllPosts: state => {
    return state.allPosts
  },
  getFeaturedPost: state => {
    return state.featuredPost
  },
  getLoadingState: state => {
    return state.isLoading
  },  
}

export const mutations = {
  setAllPosts: (state, payload) => {
    state.allPosts = payload
  },
  setFeaturedPost: (state, payload) => {
    state.featuredPost = payload
  },
  setLoadingState:(state, payload) => {
    state.isLoading = payload
  },
}

export const actions = {
  async fetchAllPosts({ state, commit }) {
    if (state.allPosts.length) return
    try {
      let posts = await fetch( `https://techcrunch.com/wp-json/wp/v2/posts?page=1&per_page=13&_embed=1`).then(res => res.json())
      posts = posts
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, content, jetpack_featured_media_url, _embedded, }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          content,
          jetpack_featured_media_url,
          _embedded,
        }))
      const featured = posts.shift(); 
      commit("setFeaturedPost", featured) 
      commit("setAllPosts", posts)
    } catch (err) {
      console.log(err)
    }
  },
  async updateAllPosts({ state, commit }, payload) {
    try {
      let posts = await fetch( `https://techcrunch.com/wp-json/wp/v2/posts?page=${payload}&per_page=12&_embed=1`).then(res => res.json())
      posts = posts
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, content, jetpack_featured_media_url, _embedded }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          content,
          jetpack_featured_media_url,
          _embedded
        }))
      const previousPost= state.allPosts
      commit("setAllPosts", previousPost.concat(posts))
    } catch (err) {
      console.log(err)
    }
  },
  async fetchRelatedPost(_,payload) {
    try {
      let posts = await fetch(
      `https://techcrunch.com/wp-json/wp/v2/posts?categories=${payload.category}&_embed=1`
    ).then((res) => res.json())
    posts = posts
      .filter(
        (el) => el.status === 'publish' && el.id !== payload.id
      )
      .map(
        // eslint-disable-next-line camelcase
        ({ id, slug, title, excerpt, date, jetpack_featured_media_url,_embedded}) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          jetpack_featured_media_url,
          _embedded
        })
      )
      return posts.slice(0, 3)
    } catch (err) {
      console.log(err)
    }
  },
}