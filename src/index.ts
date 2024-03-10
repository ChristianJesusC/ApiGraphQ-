import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import express, { Express, Request, Response } from "express";
import connectDB from "./database/mongoConection";
import { typeDefs } from "./stands/graphql/typesDefs";
import {resolvers} from "./stands/graphql/resolvers"
import { Stand } from "./stands/models/stands";

const app: Express = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

connectDB();

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Servidor corriendo en ${url}`);
})();

app.post("/webhook", async (req: Request, res: Response) => {
  const webhookData = req.body;

  const stand = await Stand.findOne({ nombre: webhookData.nombre });
  if (stand) {
    stand.descripcion = webhookData.descripción;
    await stand.save();
  }

  res.status(200).end();
});

app.listen(3001, () => console.log("Webhook corriendo en puerto 3001"));