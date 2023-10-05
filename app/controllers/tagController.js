const { Tag } = require('../models');

const tagController = {
    getAll: async (req, res) => {
        try { 
          console.log("GET /tags");
    
          
          const tags = await Tag.findAll({
            include: ['cardsFromTag'], 
            order: [
              ['position', 'ASC']
            ]
          });
    
          
          return res.json(tags);
        } catch (error) { 
          console.log(error);
          console.trace();
          return res.status(500).json({ error: "Unexpected server error" });
        }
      },

      getOne: async (req, res) => {
        try {
          const tagId = parseInt(req.params.id, 10);
          
          const tag = await Tag.findByPk(tagId, {
            include: ['cardsFromTag'],
          });
    
          
          if (!tag) {
            return res.status(404).json({ error: "Tag not found. Please verify the provided id" });
          }
    
         
          return res.json(tag);
    
        } catch (error) {
          console.log(error);
          console.trace();
          res.status(500).json({ error: "Unexpected server error" });
        }
      },

      create: async (req, res) => {
        try {

          //! 1. Validation des données
          if (!req.body.name) {
            return res.status(400).json({ error: "Missing body parameter : name" });
          }
          if (typeof req.body.color !== 'string') {
            return res.status(400).json({ error: "Invalid type: color should be a string" });
          }
    
          //! 2. Création de la ressource
          
          const newTag = await Tag.create({
            title: req.body.name,
            color: req.body.color,

          });
    
          //! 3. Retour au client
          
          return res.status(201).json(newTag);
        } catch (error) {
          console.log(error);
          console.trace();
          res.status(500).json({ error: "Unexpected server error" });
        }
      },

      update: async (req, res) => {
        try {
          const tagId = Number(req.params.id);
    
          //! 1. Validation des données
          const foundTag = await Tag.findByPk(tagId);
          if (!foundTag) {
            return res.status(404).json({ error: "tag not found. Please verify the provided id" });
          }
          if (typeof(req.body.name) !== "undefined" && typeof(req.body.name) !== "string"){
            return res.status(400).json({ error: "Invalid body parameter 'name'. Should provide a string." });
          }
          if (typeof req.body.color !== 'string') {
            return res.status(400).json({ error: "Invalid type: color should be a string" });
          }
          
          
    
          //! 2. MaJ de la ressource
          await foundTag.update({
            name: req.body.name,
            color: req.body.color,



          });
    
          //! 3. Retour au client
          return res.json(foundTag);
        } catch (error) {
          console.log(error);
          console.trace();
          res.status(500).json({ error: "Unexpected server error" });
        }
      },

      delete: async (req, res) => {
        try {
          const tagId = Number(req.params.id);
    
          //! 1. Delete de la ressource + verif
          const suppressedTag = await Tag.destroy({
            where: {
              id: tagId
            }
          });
          
          if (suppressedTag === 0) {
            return res.status(404).json({ error: "Tag not found. Please verify the provided id" });
          }
    
          //! 2. Retour au client
          
          return res.sendStatus(204);
    
        } catch (error) {
          console.log(error);
          console.trace();
          res.status(500).json({ error: "Unexpected server error" });
        }
      },
}