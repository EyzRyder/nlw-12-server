import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoute } from "./routes/memories";
const port = 3333;
const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(memoriesRoute);

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`✅🚄 Server running in http://localhost:${port}`);
  });
