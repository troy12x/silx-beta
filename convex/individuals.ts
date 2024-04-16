import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";



export const create = mutation({
  args: {
    individualTitle: v.string(),
    skill: v.string(),
    experience: v.string(),
    name:v.string(),
    description:v.string(),
    githubToken:v.optional(v.string()),
    cv:v.string(),
    email:v.string(),
    programmingLanguages: v.array(v.string()),
    score:v.string()
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
      name:args.name,
      cv:args.cv,
      email:args.email,
      githubToken:args.githubToken,
      score:args.score,
      programmingLanguages: args.programmingLanguages,
      userId,
      description:args.description
    });

    return individual;
  }
});

export const insert = mutation({
  args: {
    id: v.id("individual"),
    githubToken: v.optional(v.string()),
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

    // Validate the githubToken
    if (!args.githubToken) {
      throw new Error("GitHub token is required");
    }

    const company = await ctx.db.patch(args.id, {
      githubToken: args.githubToken,
    });

    return company;
  },
});

export const getGithub = query({
  args: {
    githubToken: (v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;


    if ( userId) {
      throw new Error("Unauthorized");
    }

    // Validate the githubToken
    if (!args.githubToken) {
      throw new Error("GitHub token is required");
    }


  },
});



export const logout = mutation({
  args: {
    id: v.id("individual"),
    githubToken: v.optional(v.string()),
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
      githubToken: args.githubToken,
    });

    return company;
  },
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





export const getSidebar = query({
  args: {
   id: v.optional(v.id("individual")),
   cv:v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw console.log('test');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("individual")
      .withIndex("by_user", (q) =>
        q
          .eq("userId", userId)
   
      )

      .order("desc")
      .collect();

    return documents;
  },
});






export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();




    const documents = await ctx.db
      .query("individual")

      .order("desc")
      .collect();

    return documents;
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

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Not found");
    } 

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  }
});



export const getIndividual = query({
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

export const getAll = query({
  handler: async (ctx) => {
    const individuals = await ctx.db.query("individual").collect();

    return individuals;
  },
});


export const update = mutation({
  args: {
    id: v.id("individual"),
    name:v.string(),
    email:v.string(),
    skill: v.optional(v.string()),
    experience: v.optional(v.string()),
    description:v.string(),
    score:v.optional(v.string()),
    programmingLanguages: v.optional(v.array(v.string())),  // Add this line

  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingIndividual = await ctx.db.get(args.id);

    if (!existingIndividual) {
      throw new Error("Not found");
    }

    if (existingIndividual.userId !== userId) {
      throw new Error("Unauthorized");
    }

    if (!args.name || !args.email || !args.description ) {
      throw new Error("Required fields cannot be empty");
    }


    const individual = await ctx.db.patch(args.id, {

      skill: args.skill,
      experience: args.experience,
      name:args.name,
      email:args.email,
      score:args.score,
    
      userId,
      description:args.description,
      programmingLanguages: args.programmingLanguages,  // Add this line
    
    });

    return individual;
  },
});




export const updateCV = mutation({
  args: {
    id: v.id("individual"),
    name:v.optional(v.string()),
    email:v.optional(v.string()),
    skill: v.optional(v.string()),
    experience: v.optional(v.string()),
    description:v.optional(v.string()),
    cv:v.optional(v.string()),
    programmingLanguages: v.optional(v.array(v.string())),  // Add this line
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    });

    return document;
  },
});



export const removeCV = mutation({
  args: { id: v.id("individual") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      cv:undefined
    });

    return document;
  }
});
