const contentful = require("contentful");

const clientForProd = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const clientForPreview = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com"
})

export async function getSortedPostsData(preview) {
  const client = preview ? clientForPreview : clientForProd
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
  const entries = await clientForProd.getEntries({
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

export async function getPostData(id, preview) {
  const client = preview ? clientForPreview : clientForProd
  const entry = await client.getEntry(id)
  if (entry) return {
    id: entry.sys.id,
    title: entry.fields.title,
    date: entry.fields.date,
    description: entry.fields.description
  }
  console.error("no entry")
}
