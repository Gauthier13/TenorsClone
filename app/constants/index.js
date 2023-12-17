// Pour accéder au système de fichiers
import { log } from 'console';
import fs from 'fs/promises';

// Les liens de la nav bar
// Je les déclare ici dans le but de venir les afficher dans mon composant ensuite.
// Cela me permet d'avoir un seul fichier à modifer si jamais je veux ajouter/supprimer un lien dans la navbar.
export const NavbarLinks = [
  { href: '/musicians', key: 'Musicians', label: 'Musicians', id: 'musicians' },
  { href: '/concerts', key: 'Concerts', label: 'Concerts', id: 'concerts' },
];


// -----------------LES FONCTIONS QUI SIMULENT MA CONNEXION À UNE BDD--------------------------

// récupérer les musiciens du fichier data.json
export async function getMusicians() {
  // récupérer le contenu du fichier data.json
  const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
  // on le parse pour le rendre exploitable
  const data = JSON.parse(rawFileContent);
  // on ajoute les données de l'objet "musicians" s'il existe 
  const storedMusicians = data.musicians ?? [];
  return storedMusicians;
}

// stocker un nouveau musicien 
export async function storeMusician(data) {

  // ici le split permet d'isoler chaque mot séparés par une virgule pour les ajouter dans un array
  // cette méthode n'est pas du tout idéale et ne protège pas des erreurs
  const newMusician = {
    id: data.id,
    name: data.name,
    instruments: data.instruments.split(', '),
    styles: data.styles.split(', ')
  }
  // Lire le contenu actuel du fichier JSON
  const contenu = await fs.readFile('data.json', 'utf-8');
  const db = JSON.parse(contenu)

  // si note bdd contient un objet musicien, on push. Sinon, on crée un array vide
  db.musicians ? db.musicians.push(newMusician) : db.musicians = []

  // convertir les données en json pour les écrire sur le fichier data.json ensuite
  const updatedFile = JSON.stringify(db, null, 2)
  // écriture des nouvelles données dans le fichier qui nous sert de bdd 
  return fs.writeFile('data.json', updatedFile, 'utf-8')
}

export async function updateMusician(data, id) {

  console.log("data :" + JSON.stringify(data));
  console.log("id :" + JSON.stringify(id));

  // console.log("data depuis edit: "+ JSON.stringify(data));
  // on déclare un nouvel objet à qui on assigne les données mise à jour sur la page edit
  const updateMusician = {
    id: id,
    name: data.name,
    instruments: data.instruments.split(', '),
    styles: data.styles.split(', ')
  }
  console.log("updateMusician :" + JSON.stringify(updateMusician));

  // console.log("updateMusician: "+ JSON.stringify(updateMusician));

  // On récupère le contenu fichier data.json 
  const contenu = await fs.readFile('data.json', 'utf-8');
  const db = JSON.parse(contenu)
  let updatedFile = null

  for (let i = 0; i < db.musicians.length; i++) {
    if (updateMusician.id === db.musicians[i].id) {
      db.musicians[i] = {...db.musicians[i], ...updateMusician}
      console.log("TROUVÉ !: " + JSON.stringify(db, null,2));
      updatedFile = JSON.stringify(db, null, 2)
    }
  }

  return fs.writeFile('data.json', updatedFile, 'utf-8')
}
