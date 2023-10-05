// const { Router } = require('express');
// const router = Router();
// Equivalent 1 ligne
const router = require('express').Router();
const listController = require("../controllers/listController");

// Nos routes
router.get("/", (req, res) => {
  res.send("Hello from oKanban API");
});

//* LISTS
router.get("/lists", listController.getAll);
router.get("/lists/:id", listController.getOne);
router.post("/lists", listController.create);
router.patch("/lists/:id", listController.update);
router.delete("/lists/:id", listController.delete);

//* CARDS
router.get("/card", cardController.getAll);
router.get("/card/:id", cardController.getOne);
router.post("/card", cardController.create);
router.patch("/card/:id", cardController.update);
router.delete("/card/:id", cardController.delete);

//* TAGS
router.get("/tags", tagController.getAll);
router.post("/tags", tagController.create);
router.patch("/tags/:id", tagController.update);
router.delete("/tags/:id", tagController.delete);

router.post("/cards/:id/tag", tagController.getOne);
router.delete("/cards/:card_id/tag/:tag_id", tagController.delete);



module.exports = router;
