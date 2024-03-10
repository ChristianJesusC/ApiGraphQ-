import axios from "axios";
import { Stand } from "../models/stands";

export const resolvers = {
    Query: {
      stands: async () => {
        const stands = await Stand.find({});
        axios.post(process.env.WEBHOOK_URL!, {
          content: `Se realizó una consulta para obtener todos los stands.`,
        });
        return stands;
      },
      stand: async (__: void, args: any) => {
        const stand = await Stand.findById(args.id);
        axios.post(process.env.WEBHOOK_URL!, {
          content: `Se realizó una consulta para obtener el stand con id ${args.id}.`,
        });
        return stand;
      },
    },
    Mutation: {
      createStand: async (__: void, args: any) => {
        let stand = new Stand(args.stand);
        const newStand = await stand.save();
        axios.post(process.env.WEBHOOK_URL!, {
          content: `Se creó un nuevo stand con id ${newStand.id}.`,
        });
        return newStand;
      },
      deleteStand: async (__: void, args: any) => {
        const deletedStand = await Stand.findByIdAndDelete(args.id);
        axios.post(process.env.WEBHOOK_URL!, {
          content: `Se eliminó el stand con id ${args.id}.`,
        });
        return deletedStand;
      },
      updateStand: async (__: void, args: any) => {
        const updatedStand = await Stand.findByIdAndUpdate(args.id, args.stand, {
          new: true,
        });
        axios.post(process.env.WEBHOOK_URL!, {
          content: `Se actualizó el stand con id ${args.id}.`,
        });
        return updatedStand;
      },
    },
  };