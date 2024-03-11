import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import express, { Express, Request, Response } from "express";
import connectDB from "./database/mongoConection";
import { Stand } from "./stands/models/stands";
import { resolvers as standsResolvers } from "./stands/graphql/resolvers";
import { typeDefs as standsTypeDefs } from "./stands/graphql/typesDefs";
import { typeDefs as usersTypeDefs } from "./users/graphql/typesDefsUser";
import { resolvers as userResolvers } from "./users/graphql/resolversUSER";

const app: Express = express();
app.use(express.json());

const typeDefs = [standsTypeDefs, usersTypeDefs];
const resolvers = [standsResolvers, userResolvers];

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
