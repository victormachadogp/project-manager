import express from 'express'
import multer from 'multer'
import path from 'path'
import cors from 'cors'

const app = express()

app.use(cors())

// Configurar multer para armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Não é uma imagem.'))
    }
  },
})

// Servir arquivos estáticos
app.use('/uploads', express.static('public/uploads'))

// Rota de upload
app.post('/images/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' })
  }

  res.json({
    filePath: `/uploads/${req.file.filename}`,
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor de imagens rodando na porta ${PORT}`)
})
