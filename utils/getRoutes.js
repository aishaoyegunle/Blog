import axios from 'axios'

const baseUrl = 'https://techcrunch.com/wp-json/wp/v2'

export default async () => {
  const slugs = []
  let fetching = true
  let offset = 0
  while (fetching) {
    const { data } = await axios.get(
      `${baseUrl}/posts?_fields=id,slug&per_page=15&offset=${offset}`
    )
    await slugs.push.apply(slugs, data)
    offset = offset + 100
    if (data.length < offset) {
      fetching = false
    }
  }
  return slugs.map((item) => {
    return `/${item.slug}-${item.id}`
  })
}
