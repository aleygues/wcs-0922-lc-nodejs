const datasource = require("../utils");

module.exports = {
  create: (req, res) => {
    const repository = datasource.getRepository("Wilder");

    repository
      .query("INSERT INTO wilder(name) VALUES (?)", [req.body.name])
      .then(
        (id) => {
          repository
            .query("SELECT * FROM wilder WHERE id=?", [id])
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
  findAll: () => {},
  find: (req, res) => {
    /**
     * req.body → body request
     * → req.params → /api/wilders/:wilderId
     * req.query → /api/wilders?wilderId=...
     */
    const wilderId = req.params.wilderId;

    // find 1 wilder by its ID
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
