const { Card , Tag } = require('../models');

const cardController = {
    getAll: async (req, res) => {
        try { 
          console.log("GET /lists");
    
          
          const cards = await Card.findAll({
            include: ['list'], 
            order: [
              ['position', 'ASC']
            ]
          });
    
          
          return res.json(cards);
        } catch (error) { 
          return res.status(500).json({ message: "Unexpected server error" });
        }
      },
      getOne: async (req, res) => {
        try {
          const cardId = parseInt(req.params.id, 10);
          
          const card = await Card.findByPk(cardId, {
            include: ['list'],
          });
    
          
          if (!card) {
            return res.status(404).json({ message: "List not found. Please verify the provided id" });
          }
    
         
          return res.json(card);
    
        } catch (error) {
          res.status(500).json({ message: "Unexpected server error" });
        }
      },

      create: async (req, res) => {
        try {
         
          //! 1. Validation des données
          if (!req.body.title) {
            return res.status(400).json({ message: "Missing body parameter : name" });
          }
          if (typeof req.body.color !== 'string') {
            return res.status(400).json({ message: "Invalid type: color should be a string" });
          }
          if (req.body.position !== undefined && isNaN(req.body.position)) {
            return res.status(400).json({ message: "Invalid type: position should be a number" });
          }
    
          //! 2. Création de la ressource
          
          const newCard = await Card.create({
            title: req.body.title,
            color: req.body.color,
            position: req.body.position,

          });
    
          //! 3. Retour au client
          
          return res.status(201).json(newCard);
        } catch (error) {
          res.status(500).json({ message: "Unexpected server error" });
        }
      },

      update: async (req, res) => {
        try {
          const cardId = Number(req.params.id);
    
          //! 1. Validation des données
          const foundCard = await Card.findByPk(cardId);
          if (!foundCard) {
            return res.status(404).json({ message: "card not found. Please verify the provided id" });
          }
          if (typeof(req.body.name) !== "undefined" && typeof(req.body.name) !== "string"){
            return res.status(400).json({ message: "Invalid body parameter 'name'. Should provide a string." });
          }
          if (req.body.position !== undefined && isNaN(req.body.position)){
            return res.status(400).json({ message: "Invalid body parameter 'position'. Should provide a number." });
          }
    
          //! 2. MaJ de la ressource
          await foundCard.update({
            title: req.body.title,
            position: Number(req.body.position),
            color: req.body.color,



          });
    
          //! 3. Retour au client
          return res.json(foundCard);
        } catch (error) {
          res.status(500).json({ message: "Unexpected server error" });
        }
      },

      delete: async (req, res) => {
        try {
          const cardId = Number(req.params.id);
    
          //! 1. Delete de la ressource + verif
          const suppressedCard = await Card.destroy({
            where: {
              id: cardId
            }
          });
          
          if (suppressedCard === 0) {
            return res.status(404).json({ message: "Card not found. Please verify the provided id" });
          }
    
          //! 2. Retour au client
          
          return res.sendStatus(204);
    
        } catch (error) {
          res.status(500).json({ message: "Unexpected server error" });
        }
      },
};

module.exports = cardController;
