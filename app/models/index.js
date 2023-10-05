const List = require('./List');
const Card = require('./Card');
const Tag = require('./Tag');

//! Association carte - liste
// Une liste peut avoir plusieurs cartes
List.hasMany(Card, {
  as: 'cardsFromList', // A partir de List je veux les Cards => du coup alias = cardsFromList
  foreignKey: 'list_id' // La clé étrangère qui fait le lien entre les 2 (indépendament de la table dans laquelle elle se trouve)
});

// Une carte appartient à une seule liste
Card.belongsTo(List, {
  as: 'list', // A partir de Card je veux sa List => du coup alias = list
  foreignKey: 'list_id' // La clé étrangère qui fait le lien entre les 2 (indépendament de la table dans laquelle elle se trouve)
});

//! Association carte - tag (Many To Many)
// Une carte peut avoir plusieurs tags
Card.belongsToMany(Tag, {
  through: 'card_has_tag', // cette relation existe "à travers" la table de liaision card_has_tag
  foreignKey: 'card_id', // le nom de la clé de Card dans la table de liaison
  otherKey: 'tag_id', // le nom de "l'autre" (donc Tag)
  as: 'tags', // alias de l'association
  timestamps: true, // On gère les timestamps sur les relations
  updatedAt: false, // Mais pas le champ updated_at
});

// Un label peut avoir plusieurs cartes
Tag.belongsToMany(Card, {
  through: 'card_has_tag',
  foreignKey: 'tag_id',
  otherKey: 'card_id',
  as: 'cardsFromTag', // A partir de Tag je veux les Cards => du coup alias = cardsFromTag
  timestamps: true,
  updatedAt: false,
});

module.exports = {
  List,
  Card,
  Tag
};