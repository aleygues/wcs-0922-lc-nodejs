const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const UpvoteEntity = new EntitySchema({
  name: "Upvote",
  indices: [
    {
      name: "skillId_wilderId_unique",
      columns: ["wilder", "skill"],
      unique: true,
    },
  ],
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    upvote: {
      type: "int",
      default: 0,
    },
  },
  relations: {
    wilder: {
      type: "many-to-one",
      inverseSide: "upvotes",
      target: "Wilder",
    },
    skill: {
      type: "many-to-one",
      inverseSide: "upvotes",
      target: "Skill",
    },
  },
});

module.exports = UpvoteEntity;
