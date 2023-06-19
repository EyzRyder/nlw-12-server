import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { memoriesRoute } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import { prisma } from "./lib/prisma";
const port = 3333;
const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "spacetime",
});

app.get("/users", async () => {
  const users = await prisma.user.findMany();
  return users;
});

app.register(authRoutes);
app.register(memoriesRoute);

app
  .listen({
    port,
    host:'0.0.0.0'
  })
  .then(() => {
    console.log(`✅🚄 Server running in http://localhost:${port}`);
  });
