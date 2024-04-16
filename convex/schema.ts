import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),

    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
  .index("by_user", ["userId"])
  .index("by_user_parent", ["userId", "parentDocument"]),
  individual: defineTable({
    individualTitle: v.string(),
    skill: v.string(),
    name: v.string(),
    email: v.string(),
    experience: v.string(),
    cv: v.optional(v.string()),
    description: v.string(),
    userId: v.string(),
    programmingLanguages: v.array(v.string()), 
    githubToken:v.optional(v.string()), // Array of strings
    score:v.string(),
  })
  .index("by_user", ["userId"]),
  company:defineTable({
    companyName:v.string(),
    companyDescription:v.string(),
    companySize:v.string(),
    lookingFor:v.string(),
    payingSalary:v.string(),
    userId: v.string(),
    reqExp:v.string(),
    filters:v.string(),
   
  })
  .index("by_user", ["userId"])
});
