# OKANBAN

Projet fil rouge pour les Saisons 6 & 7

## Atelier

- [Atelier E01](./docs/ateliers/E01.md)
- [Atelier E02](./docs/ateliers/E02.md)
- [Atelier E03](./docs/ateliers/E03.md)
- [Atelier E04](./docs/ateliers/E04.md)

## Workflow

On va mettre en place un workflow particulier sur les S06 & S07 !

L'idée c'est de ne jamais travailler dans notre branche master (celle des apprennants). Pour chaque atelier on va tirer une nouvelle branche : `atelier-e01`, `atelier-e02`, etc pour pousser notre travail dedans.

Ensuite, à la fin de la correction en cours, le prof push ses modifs et nous (apprenants), on les recupère dans notre branche master.

On a ainsi, une branche master propre à chaque instant, contenant toujours la bonne correction.

Et on part de cette correction pour attaquer l'atelier pratique suivant, et ainsi s'assurrer de tous avoir la même code base.

![workflow](docs/cours/workflow_git.png)

### Commandes

**Prérequis** : On doit rajouter un `remote` à notre repos git local. Ainsi, on viendra connecter notre repo local sur le repos distant du prof !

```sh
# RAJOUT D'UN REMOTE qu'on va nommer 'correction' qui pointera vers le repos à l'adresse : git@github.com:O-Clock-Watt/S06E01-oKanban-API-RemOclock.git
git remote add correction git@github.com:O-Clock-Watt/S06E01-oKanban-API-RemOclock.git
```

**Contexte** : On a finit une journée de correction, le prof a push ses modifs sur son repos. On doit les recup sur notre master

1. On est sur notre branche d'atelier, il faut donc qu'on se déplace sur la branche master : `git checkout master`
2. On vérifit d'être sur master : `git branch`
3. On recup la correction de la journée depuis le repo du prof : `git pull --no-edit --allow-unrelated-histories -X theirs correction master`
4. On peut maintenant partir sur une nouvelle branche à partir de la correction complète : `git checkout -b atelier-e0X`
5. Et on peut bosser dedans as usual : `git add .`, `git commit -m "..."` & `git push`
6. Et le lendemain on fait pareil !
