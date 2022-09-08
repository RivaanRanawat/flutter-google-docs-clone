const express = require("express");
const Document = require("../models/document");
const documentRouter = express.Router();
const auth = require("../middlewares/auth");

documentRouter.post("/doc/create", auth, async (req, res) => {
  try {
    const { createdAt } = req.body;
    let document = new Document({
      uid: req.user,
      title: "Untitled Document",
      createdAt,
    });

    document = await document.save();
    res.json(document);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

documentRouter.get("/docs/me", auth, async (req, res) => {
  try {
    let documents = await Document.find({ uid: req.user });
    res.json(documents);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

documentRouter.post("/doc/title", auth, async (req, res) => {
  try {
    const { id, title } = req.body;
    const document = await Document.findByIdAndUpdate(id, { title });

    res.json(document);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

documentRouter.get("/doc/:id", auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    res.json(document);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = documentRouter;
