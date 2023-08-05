import cors from 'cors'
import { config } from 'dotenv'
import express, { Request, Response } from 'express'

import { routes } from './router'

const app = express()

config()
app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/', async (request: Request, response: Response) => {
    return response.json({
        message: `🐱👤> Server running!`
    })
})

app.listen(3000, () => console.log('✅ Server is running'))
