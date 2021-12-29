import express from 'express'
import process from 'process'
const app = express()
const PORT = 3000

app.use((req, res, next) => {
  res.append('X-Frame-Options', 'ALLOWALL')
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Methods', 'GET')
  res.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.append('Cross-Origin-Opener-Policy', 'same-origin')
  res.append('Cross-Origin-Embedder-Policy', 'require-corp')
  res.append('Cross-Origin-Opener-Policy-Report-Only', 'same-origin')
  res.append('Cross-Origin-Embedder-Policy-Report-Only', 'require-corp')
  next()
})

app.use(express.static('../dist'))

app.get('/test', function (req, res) {
  res.send('Hello')
})

app.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT} with PID ${process.pid}`)
)
