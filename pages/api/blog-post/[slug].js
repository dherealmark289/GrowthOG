import { fetchPostBySlug, formatWordPressPost } from '../../../lib/wordpress';

export default async function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ error: 'Missing slug parameter' });
  }
  
  try {
    // Fetch the post by slug
    const postData = await fetchPostBySlug(slug);
    
    if (!postData) {
      // If not found, return 404
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Format the post and return it as JSON
    const post = formatWordPressPost(postData);
    
    // Return the post data
    res.status(200).json({ post });
  } catch (error) {
    console.error(`Error handling post ${slug}:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}