const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const WilderEntity = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
  },
});

module.exports = WilderEntity;