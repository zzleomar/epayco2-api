import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import { urlencoded, raw, json } from 'body-parser'
import router from './routes/index'
import swaggerDocument from '../swagger.json'

dotenv.config()

const app = express()
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(raw({ type: 'application/vnd.custom-type' }))
app.use(json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router(app)

// const port = process.env.API_PORT || 8080
// if (process.env.NODE_ENV !== 'test') {
//     app.listen(port, () => {
//         console.log('Server is running..')
//     })
// }
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Express server listening on port', port)
})

export default app
