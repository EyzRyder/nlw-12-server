import "dotenv/config"

import fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import multipart from "@fastify/multipart"
import { memoriesRoute } from "./routes/memories"
import { authRoutes } from "./routes/auth"
import { uploadRoutes } from "./routes/upload"
import { resolve } from "node:path"

const port = 3333

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: "spacetime",
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoute)

app
  .listen({
    port,
    host:'0.0.0.0'
  })
  .then(() => {
    console.log(`✅🚄 Server running in http://localhost:${port}`)
  })
