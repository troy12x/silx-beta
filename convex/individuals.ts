import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createIndividual = mutation({
  args: {
    individualName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const individual = await ctx.db.insert("individual", {
      individualName: args.individualName,
      userId,
    });

    return individual;
  }
});
