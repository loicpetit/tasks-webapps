# HTML Handlebars

## Arborescence

* dist : contient le site généré
  * styles : dossier où sont générés les fichiers Sass, contient aussi directement les Fonts
* scripts
  * compile-index.js : script pour compiler la page index avec Handlebars
  * gulp-data-json.js : module pour créer la fonction à donner à gulp-data pour récupérer les données depuis des fichiers JSON
* src
  * pages : contient les templates de page Handlebars
  * partials : contient les templates réutilisables Handlebars
  * styles : contient les fichiers css et Sass

## Build

Ce projet utilise Gulp. Le fichier gulpfile.js contient les tâches. Utiliser compile et compileSass pour générer manuellement les fichiers dans le dossier dist. Sinon utiliser watchAll qui mettra à jour dist automatiquement à chaque changement.
