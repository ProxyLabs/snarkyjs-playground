import express from 'express'
import process from 'process'
import path from 'path'
import bodyParser from 'body-parser'
const app = express()
const PORT = 3001
const __dirname = path.resolve()

app.use(bodyParser.urlencoded({ extended: true }))

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

let apiRouter = express.Router()

apiRouter.post('/save', (req, res) => {
  console.log(req.body)
  res.send('asd')
})

apiRouter.get('/get/:projectID', (req, res) => {
  let code = `let a = 3;
console.log(3);`

  let func = new Function(code)

  let stringied = JSON.stringify(code)
  //console.log(stringied)

  //console.log(JSON.parse(stringied))

  res.json({
    projectID: req.params.projectID,
    code: stringied,
  })
})

app.use('/api', apiRouter)

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  console.log(res)
  res.sendFile('/../dist/index.html')
})

app.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT} with PID ${process.pid}`)
)
