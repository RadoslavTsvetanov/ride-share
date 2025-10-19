import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

function toISO8601(datetime: string) {
  // If string is missing seconds, append ":00"
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(datetime)) {
    datetime += ":00";
  }
  // Optional: force UTC with "Z" at the end
  if (!datetime.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(datetime)) {
    datetime += "Z";
  }
  return datetime;
}


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
      // const rides = await ctx.db.rideOpportunity.findMany({
      //   orderBy: { createdAt: "desc" },
      //   include: {
      //     driver: true,
      //   }
      // });


      const rides = [
        {
          id: 1,
          startLat: 38.907132,
          startLng: -77.036546,
          endLat: 38.911132,
          endLng: -77.041546,
          stops: [
            [38.907132, -77.036546],
            [38.911132, -77.041546],
          ],
          driver: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
          },
        },
        {
          id: 2,
          startLat: 38.909132,
          startLng: -77.039546,
          endLat: 38.912132,
          endLng: -77.042546,
          stops: [
            [38.909132, -77.039546],
            [38.912132, -77.042546],
          ],
          driver: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phoneNumber: '098-765-4321',
          },
        },
      ];

      return rides;
  }),


  getRideRequests: publicProcedure
  .query(async ({ ctx }) => {
    const rideRequests = await ctx.db.rideRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        passenger: true,
      }
    });
    return rideRequests;
  }),

  createRideRequest: publicProcedure
  .input(z.object({
    startLat: z.number(),
    startLng: z.number(),
    endLat: z.number(),
    endLng: z.number(),
    passengerId: z.string(),
    arrivalTime: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const rideRequest = await ctx.db.rideRequest.create({
      data: {
        startLat: input.startLat,
        startLng: input.startLng,
        endLat: input.endLat,
        endLng: input.endLng,
        passengerId: input.passengerId,
        arrivalTime: toISO8601(input.arrivalTime),
      },
    });
    return rideRequest;
  })
});
