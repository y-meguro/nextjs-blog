const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export async function getSortedPostsData() {
  const entries = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.date",
  })
  if (entries.items) {
    const posts = entries.items.map((entry) => {
      return {
        id: entry.sys.id,
        title: entry.fields.title,
        date: entry.fields.date
      }
    })
    return posts
  }
  console.error("no blog posts")
}

export async function getAllPostIds() {
  const entries = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.date",
  })
  if (entries.items) {
    return entries.items.map((entry) => {
      return {
        params: {
          id: entry.sys.id
        }
      }
    })
  }
  console.error("no blog posts")
}

export async function getPostData(id) {
  const entry = await client.getEntry(id)
  if (entry) return entry.fields
  console.error("no entry")
}
