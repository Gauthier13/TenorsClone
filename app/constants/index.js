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


// -----------------LES FONCTIONS QUI SIMULENT LA CONNEXION À UNE BDD--------------------------

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

// Récupérer tout les instruments 
export async function getAllInstruments() {
  // On récupère les données dans le fichier json qui sert de bdd
  const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
  // on le parse pour le rendre exploitable
  const data = JSON.parse(rawFileContent);

  // Avec reduce() on obtient en retour un tableau contenant tout les intrusments. 
  // Malheureusment, si un musicien a plusieurs intrusments, ceux-ci sont rangés dans un tableau et le on obtient un tableau de tableaux.
  // Fort heureusement, la fonction concat() permet de 'squeeze' tout les éléments d'un ou plusieurs tableaux en un unique tableau final, c'est presque parfait.
  // Maitenant qu'on réunit dans un tableau unique tout les instruments, ça ne protège pas des doublons, il faut encore faire du ménage.
  // C'est là qu'intervient le spread operator auquel on couple un new Set pour retirer les doublons.
  const instrumentsList = data.musicians.reduce((instrumentsArray, musician) => {
    return instrumentsArray.concat(musician.instruments)
  }, []);
  const allInstruments = [...new Set(instrumentsList)]
  return allInstruments
}

// Récupérer tout les styles (même fonction qu'au dessus)
export async function getAllStyles() {
  // On récupère les données dans le fichier json qui sert de bdd
  const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
  // on le parse pour le rendre exploitable
  const data = JSON.parse(rawFileContent);
  const stylesList = data.musicians.reduce((instrumentsArray, musician) => {
    return instrumentsArray.concat(musician.styles)
  }, []);
  const allStyles = [...new Set(stylesList)]
  return allStyles
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

// Update d'un musicien
export async function updateMusician(data, id) {

  // on déclare un nouvel objet à qui on assigne les données mise à jour sur la page edit
  const updateMusician = {
    id: id,
    name: data.name,
    instruments: data.instruments.split(', '),
    styles: data.styles.split(', ')
  }

  // On récupère le contenu fichier data.json 
  const contenu = await fs.readFile('data.json', 'utf-8');
  const db = JSON.parse(contenu)
  let updatedFile = null

  // Ici on filtre la bdd pour récupérer l'id qui match avec celui de notre edit 
  // Il existe probablement une manière plus élégante de filtrer
  for (let i = 0; i < db.musicians.length; i++) {
    if (updateMusician.id === db.musicians[i].id) {
      db.musicians[i] = { ...db.musicians[i], ...updateMusician } // A chaque fois que j'utilise un spread operator j'ai l'impression de faire quelque chose de bien
      updatedFile = JSON.stringify(db, null, 2)
    }
  }

  return fs.writeFile('data.json', updatedFile, 'utf-8')
}

// filtrer par instruments
export async function filterInstrument (filter) {
  
  const musicianList = await getMusicians();
  // avec le filter, tout les musciens qui contiennent un instrument = à la valeur du filtre, sont poussés dans un nouvel array 
  const filteredData = musicianList.filter(musician => musician.instruments.includes(filter.instruments));
  return filteredData
}

// filtrer par style de musique
export async function filterStyle (filter) {
  const stylesList = await getMusicians();
  const filteredData = stylesList.filter(musician => musician.styles.includes(filter.styles));
  return filteredData
}