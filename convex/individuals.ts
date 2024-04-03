import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";



export const create = mutation({
  args: {
    individualTitle: v.string(),
    skill: v.string(),
    experience: v.string(),
   
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const individual = await ctx.db.insert("individual", {
      individualTitle: args.individualTitle,
      skill: args.skill,
      experience: args.experience,

      userId,
    });

    return individual;
  }
});

export const manage = mutation({
  args: {
    // No need for arguments in this mutation
  },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    return userId;
  }
});

export const getIndividualById = query({
  args: { id: v.id("individual") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const individual = await ctx.db.get(args.id);

    if (!individual) {
      throw new Error("Individual not found");
    }



    return individual;
  }
});







export const get = query({
  args: { id: v.id("individual") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const individual = await ctx.db.get(args.id);

    if (!individual) {
      throw new Error("Not found");
    }


    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (individual.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return individual;
  }
});

export const getServer = mutation({
  args: { id: v.id("individual") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const individual = await ctx.db.get(args.id);

    if (!individual) {
      throw new Error("Individual not found");
    }


    if (individual.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return individual;
  }
});

export const getById = query({
  args: { id: v.id("individual") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const individual = await ctx.db.get(args.id);

    if (!individual) {
      throw new Error("Not found");
    }



    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (individual.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return individual;
  }
});

export const getIndividual = query({
  args: { id: v.id("individual") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const individual = await ctx.db.get(args.id);

    if (!individual) {
      throw new Error("Not found");
    }



    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (individual.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return individual;
  }
});

export const update = mutation({
  args: {
    id: v.id("individual"),
    individualTitle: v.optional(v.string()),
    skill: v.optional(v.string()),
    experience: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingIndividual = await ctx.db.get(args.id);

    if (!existingIndividual) {
      throw new Error("Not found");
    }

    if (existingIndividual.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const individual = await ctx.db.patch(args.id, {
      ...rest,
    });

    return individual;
  },
});
