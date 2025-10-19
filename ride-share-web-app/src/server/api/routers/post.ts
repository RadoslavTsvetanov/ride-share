import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),


// make it so that in the future it accepts options for either end destinaton, start destination, both, or all in a certain radius

  getRidesOpportunities: publicProcedure
    .query(async ({ ctx }) => {
      const rides = await ctx.db.rideOpportunity.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          driver: true,
        }
      });

      return rides;
  }),
});
