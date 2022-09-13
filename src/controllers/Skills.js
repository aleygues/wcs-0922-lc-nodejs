const datasource = require("../utils");

module.exports = {
  create: (req, res) => {
    const repository = datasource.getRepository("Skill");

    repository
      .query("INSERT INTO skill(name) VALUES (?)", [req.body.name])
      .then(
        (id) => {
          repository
            .query("SELECT * FROM skill WHERE id=?", [id])
            .then((data) => {
              res.json(data[0]);
            });
        },
        (err) => {
          console.error("Error: ", err);
          res.json({ success: false });
        }
      );
  },
  findAll: (req, res) => {
    const repository = datasource.getRepository("Skill");

    repository.query("SELECT * FROM skill").then((data) => {
      res.json(data);
    });

    /**
      repository.find().then((data) => {
        res.json(data);
      });
     */
  },
  find: (req, res) => {
    /**
     * req.body → body request
     * → req.params → /api/skills/:skillId
     * req.query → /api/skills?skillId=...
     */
    const skillId = req.params.skillId;

    // find 1 skill by its ID
  },
  update: (req, res) => {
    /**
     * 2 options:
     * - raw SQL → UPDATE
     * - TypeORM: find + save
     */
  },
  delete: (req, res) => {
    /**
     * 2 options:
     * - raw SQL → DELETE
     * - TypeORM: find + remove
     */
  },
};
