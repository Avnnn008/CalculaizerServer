require('dotenv').config()

const adminCheckingController= async (req, res) => {
    try {
      const email = req.user.email
      if (email!==process.env.ADMIN_EMAIL) {
        return res.status(403).send()
      }
      res.status(200).json({message: 'success'})
    } catch  {
        res.status(500).send()
    }
}

module.exports = adminCheckingController