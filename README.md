# Sportify

Ce projet a ete cree dans le cadre de l'ECF Studi Web-Web mobile.
Petites excuses concernant les accents, ayant un clavier QWERTY a tendances humouristiaues, celui-ci refuse categoriquement de produire un quelconque accent (Je pense qu'il n'aime pas les Francais)

## Prerequis

Le projet contient 2 parties. Cette partie est l'API, a installer en premier. Le front du site se trouve [ici](https://github.com/CarrascoAlexis/Sportify)

## Installation

Dans un premier temps, clonez le repo ou vous le souhaitez sur votre machine. Il est recommande de plqcer le dossier de ce projet q cote de celui de l'API. Entrez ensuite dans le dossier.

### `git clone git@github.com:CarrascoAlexis/SportifyAPI.git`
### `cd SportifyAPI`

Une fois dans le dossier, assurez vous d'etre sur la branche principale. La branche de DEV contiens la version finale, aui n'a pas pu etre produite dans les delais impartis.

### `git checkout main`

Une fois dans lq bonne brqnche et le projet telechqrge, il faut installer toutes les librairies. Cette installation se fait automatiauement si le fichier package.json est bien present. Si celui-ci est absent ou bien supprime, telechargez le depuis le Git pour le placer a la racine du projet (dans le dossier Sportify)

### `npm install`

Une fois les dependances installees, il faut importer la BDD. Pour se faire, il est possible d'importer via n'importe quel panel les fichiers SQL. Si vous utilisez MySQL en ligne de commande, vous pouvez egalement importer les fichiers manuellement.

Dans le dossier SQL du projet vous pourrez trouver deux fichiers. Le premier permet la creation de la BDD (Celle-ci sera deja remplie de quelques events et comptes afin de montrer le fonctionnement. Tous les comptes fournis aurront pour MDP "motdep".). Le second fichier permet la creation du user utilise par l'API. Ici le MDP fournit pour l'user est simplifie.

Il fqut importer les fichiers dans cet ordre :
1. db.sql
2. userCreation.sql

Une fois les lq BDD importee, voius pouvez lqncer l'API.

### `npm run dev`

Cette commande lance le projet en mode dev. Cela lui permet de redemarrer automatiquement en cas de crash. Si vous souhaitez lancer le serveur dans la meme configuration aue l'hebergeur, il faut le lancer avec la commande:

### `node index.js`

Une fois l'API lancee, vous pouvez lancer le front.