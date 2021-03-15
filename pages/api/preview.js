import { getPostData } from '../../lib/posts'

export default async function preview(req, res) {
  const { secret, id } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !id) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const draft = await getPostData(id, true)
  if (!draft) {
    return res.status(401).json({ message: 'Invalid id' })
  }

  res.setPreviewData({})
  res.writeHead(307, { Location: `/posts/${draft.id}` });
  res.end('Preview mode enabled');
}