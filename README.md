Ce travail a été réalisé dans le cadre d'un test technique. Il a été conu avec RemixJs ainsi que Tailwind. Il utilise également uuid qui génère des id uniques. 

Le site prend la forme d'un panneau admin dans lequel on peut ajouter/modifier du contenu.

Le site contient trois pages :

- Home page qui permet de :
    - consulter les concerts à venir et les filtrer par style de musique
    - consulter les profils de musiciens 

- Add musicians qui permet à la fois de : 
    - filtrer les profils de musisicens selon les style ET/OU instruments 
    - ajouter un nouveau profil de musicien
    - consulter tout les profils

- Add concerts qui permet à la fois de : 
    - consulter tout les concerts, même ceux à une date antérieur à celle du jour  
    - ajouter un nouveau concert
    - consulter tout les profils

A tout moment, il est possible de mettre à jour un profil de musicien ou bien un concert en cliquant sur "edit". C'est dans la fonction d'edit qu'il est aussi possible de supprimer un profil ou un concert.


Détail technique :
Le site ne retourne pas à sa valeur par défaut à la fermeture du navigateur, c'est à dire que si un profil de musicien a été ajouté, il sera sauvegardé et visible à la prochaine ouverture du site. Cela est dû au fait que le site réalise les opérations CRUD directement sur le fichier qui sert de bdd et pas sur une copie de celui-ci à l'ouverture du site. Les fonctions qui manipulent les données sont toutes écrites dans le fichier index.js du répertoire constants. 
Un fichier dbReset.js dans le répertoire constants propose une solution pour que le site retourne naturellement à sa valeur par défaut en réalisant les manipulations des données sur une copie de l'était initial du site mais cela "casse" le système de filtre (et je n'arrive pas encore à comprendre pourquoi), le reste des fonctions est parfaitement fonctionnel. J'ai également exploré une solution exploitant le local storage qui, sur le papier, semble être plus adaptée mais je n'ai pas réussi à l'implémenter par faute de temps. 

En vous souhaitant une belle découverte du projet ! 

Gauthier Leclair


# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
