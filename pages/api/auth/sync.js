// Auth disabled - quick access mode
export default function handler(req, res) {
  const { name, email } = req.body;
  res.status(200).json({ 
    success: true,
    user: {
      id: 1,
      username: 'quickuser',
      email: email || 'user@example.com',
      name: name || 'Quick Access User',
      isTemporary: false
    }
  });
}