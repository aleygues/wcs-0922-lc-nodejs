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
  findAll: (req, res) => {
    const repository = datasource.getRepository("Wilder");

    repository.find().then((data) => {
      res.json(data);
    });
  },
  find: (req, res) => {
    /**
     * req.body → body request
     * → req.params → /api/wilders/:wilderId
     * req.query → /api/wilders?wilderId=...
     */
    const wilderId = req.params.wilderId;

    // find 1 wilder by its ID
    datasource
      .getRepository("Wilder")
      .findOneBy({ id: wilderId })
      .then(
        (data) => {
          res.json(data);
        },
        (err) => {
          console.error("Error: ", err);
          res.json({ success: false });
        }
      );
  },
  update: (req, res) => {
    /**
     * 2 options:
     * - raw SQL → UPDATE
     * - TypeORM: find + save
     */
    const wilderId = req.params.wilderId;
    const repository = datasource.getRepository("Wilder");

    // find 1 wilder by its ID
    // Google → typeorm get 1 item by ID
    repository.findOneBy({ id: wilderId }).then(
      (wilder) => {
        Object.assign(wilder, req.body);
        // ~= wilder.name = req.body.name;

        repository.save(wilder).then(
          (updatedWilder) => {
            res.json(updatedWilder);
          },
          (err) => {
            console.error("Error when saving: ", err);
            res.json({ success: false });
          }
        );
      },
      (err) => {
        console.error("Error when finding: ", err);
        res.json({ success: false });
      }
    );
  },
  delete: (req, res) => {
    /**
     * 2 options:
     * - raw SQL → UPDATE
     * - TypeORM: find + save
     */
    const wilderId = req.params.wilderId;
    const repository = datasource.getRepository("Wilder");

    // raw SQL
    repository.query("DELETE FROM wilder WHERE id=?", [wilderId]).then(
      () => {
        res.json({ success: true });
      },
      (err) => {
        console.error("Error when removing: ", err);
        res.json({ success: false });
      }
    );

    /* // find 1 wilder by its ID
    // Google → typeorm get 1 item by ID
    repository.findOneBy({ id: wilderId }).then(
      (wilder) => {
        repository.remove(wilder).then(
          () => {
            res.json({ success: true });
          },
          (err) => {
            console.error("Error when removing: ", err);
            res.json({ success: false });
          }
        );
      },
      (err) => {
        console.error("Error when finding: ", err);
        res.json({ success: false });
      }
    ); */
  },
};
