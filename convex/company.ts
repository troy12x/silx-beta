
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
      companyName: v.string(),
      companyDescription: v.string(),
      companySize: v.string(),
      lookingFor: v.string(),
      payingSalary: v.string(),
      reqExp:v.string(),
      filters:v.string(),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      const userId = identity.subject;

      const existingCompany = await ctx.db
      .query("company")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingCompany) {
      throw new Error("You already have an account. You need to create a new company account.");
    }
  
      const company = await ctx.db.insert("company", {
        companyName: args.companyName,
        companyDescription: args.companyDescription,
        companySize: args.companySize,
        lookingFor: args.lookingFor,
        filters:args.filters,
        payingSalary: args.payingSalary,
        reqExp:args.reqExp,
        userId,
      });
  
      return company;
    }
  });

export const getCById = query({
  args: { documentId: v.id("company") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw console.log("");
    }

    const userId = identity.subject;

    const company = await ctx.db.get(args.documentId);

    if (!company) { 
      throw new Error("Company not found");
    }

    if (company.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return company;
  }
});

export const getById = query({
  args: { id: v.id("company") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    }


    return document;
  }
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("company"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
       throw console.log("love you");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("company")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return documents;
  },
});

export const get = query({
  args: { id: v.id("company") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const company = await ctx.db.get(args.id);

    if (!company) {
      throw new Error("Company not found");
    }

    if (company.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return company;
  }
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const documents = await ctx.db
      .query("company")

      .order("desc")
      .collect();

    return documents;
  }
});





export const update = mutation({
    
  args: {
    id: v.id("company"),
    companyName: v.string(),
    companyDescription: v.string(),
    companySize: v.string(),
    lookingFor: v.string(),
    payingSalary: v.string(),
    reqExp:v.string(),
    filters:v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingCompany = await ctx.db.get(args.id);

    if (!existingCompany) {
      throw new Error("Company not found");
    }

    if (existingCompany.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Validate required fields
    if (!args.companyName || !args.companyDescription || !args.companySize || !args.lookingFor || !args.payingSalary) {
      throw new Error("All required fields must be filled out");
    }

    const company = await ctx.db.patch(args.id, {
      companyName: args.companyName,
      companyDescription: args.companyDescription,
      companySize: args.companySize,
      lookingFor: args.lookingFor,
      filters:args.filters,
      reqExp:args.reqExp,
      payingSalary: args.payingSalary,
    });

    return company;
  },
});



export const insert = mutation({
  args: {
    id: v.id("company"),
    filters:v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingCompany = await ctx.db.get(args.id);

    if (!existingCompany) {
      throw new Error("Company not found");
    }

    if (existingCompany.userId !== userId) {
      throw new Error("Unauthorized");
    }

 

    const company = await ctx.db.patch(args.id, {
      filters: args.filters,
    });

    return company;
  },
});


