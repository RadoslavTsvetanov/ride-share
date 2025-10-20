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
      const rides = await ctx.db.rideOpportunity.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          driver: true,
        }
      });



      return rides;
  }),


  getRideRequests: publicProcedure
  .query(async ({ ctx }) => {
    const rideRequests = await ctx.db.rideRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        passenger: {
          include: {
            userDetails: true,
          }
        },
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
  }),

  getCompanyPageData: publicProcedure
  .input(z.object({
    companyName: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    const company = await ctx.db.driver.findFirst({
      where: {
        userDetails: {
          name: input.companyName,
        },
      },
      include: {
        reviewsReceived: {
          include: {
            passengerAuthor: {
              include: {
                userDetails: true
              }
            },
            driverAuthor: {
              include: {
                userDetails: true
              }
            }
          }
        },
        rides: {
          include: {
            reviews: {
              include: {
                passengerAuthor: {
                  include: {
                    userDetails: true
                  }
                },
                driverAuthor: {
                  include: {
                    userDetails: true
                  }
                }
              }
            }
          }
        }
      },
    });
    return company;
  }),

  getRideOpportunityData: publicProcedure
  .input(z.object({
    rideOpportunityId: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    const rideOpportunity = await ctx.db.rideOpportunity.findUnique({
      where: {
        id: input.rideOpportunityId,
      },
      include: {
        driver: {
          include: {
            userDetails: true,
          }
        },
        rides: true,
        participants: {
          include: {
            userDetails: true,
          }
        },
      }
    });
    return rideOpportunity;
  }),

  createRideOpportunity: publicProcedure
  .input(z.object({
    driverId: z.string(),
    stops: z.array(z.tuple([z.number(), z.number()])),
    arrivalTime: z.string(),
    price: z.number().optional(),
  }))
  .mutation(async ({ ctx, input }) => {
    if (input.stops.length < 2) {
      throw new Error("At least 2 stops (start and end) are required");
    }

    const startStop = input.stops[0];
    const endStop = input.stops[input.stops.length - 1];

    const rideOpportunity = await ctx.db.rideOpportunity.create({
      data: {
        driverId: input.driverId,
        startLat: startStop![0],
        startLng: startStop![1],
        endLat: endStop![0],
        endLng: endStop![1],
        stops: input.stops,
        arrivalTime: toISO8601(input.arrivalTime),
        price: input.price ?? 1.6,
      },
    });
    return rideOpportunity;
  }),

  getPassengerData: publicProcedure
  .input(z.object({
    passengerId: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    const passenger = await ctx.db.passenger.findUnique({
      where: {
        id: input.passengerId,
      },
      include: {
        userDetails: true,
        reviewsReceived: {
          include: {
            passengerAuthor: {
              include: {
                userDetails: true
              }
            },
            driverAuthor: {
              include: {
                userDetails: true
              }
            },
            ride: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        rides: {
          include: {
            rideOpportunity: {
              include: {
                driver: {
                  include: {
                    userDetails: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        rideRequests: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    });
    return passenger;
  }),

  getAllPassengers: publicProcedure
  .query(async ({ ctx }) => {
    const passengers = await ctx.db.passenger.findMany({
      include: {
        userDetails: true,
        reviewsReceived: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return passengers;
  }),

  addPassengerToRideOpportunity: publicProcedure
  .input(z.object({
    rideOpportunityId: z.string(),
    passengerId: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const rideOpportunity = await ctx.db.rideOpportunity.update({
      where: {
        id: input.rideOpportunityId,
      },
      data: {
        participants: {
          connect: {
            id: input.passengerId,
          },
        },
      },
    });
    return rideOpportunity;
  }),
});
