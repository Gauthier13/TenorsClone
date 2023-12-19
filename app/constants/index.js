// Pour accéder au système de fichiers
import fs from 'fs/promises';

// Les liens de la nav bar
// Je les déclare ici dans le but de venir les afficher dans mon composant ensuite.
// Cela me permet d'avoir un seul fichier à modifer si jamais je veux ajouter/supprimer un lien dans la navbar.
export const NavbarLinks = [
  { href: '/musicians', key: 'Musicians', label: 'Musicians', id: 'musicians' },
  { href: '/concerts', key: 'Concerts', label: 'Concerts', id: 'concerts' },
];





// -----------------LES FONCTIONS QUI SIMULENT LA CONNEXION À UNE BDD--------------------------


// récupérer les musiciens du fichier data.json qui sert de bdd
export async function getMusicians() {
  // récupérer le contenu du fichier data.json
  const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
  // on le parse pour le rendre exploitable
  const data = JSON.parse(rawFileContent);
  // on ajoute les données de l'objet "musicians" sinon, on ouvre un nouvel array
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


// système de filtre des musiciens
export async function filterMusicians(filter) {
  // L'argument filter de la fonciton arrive sous forme de string dans contenant les valeurs du filtre séparées par des virgules
  // Je commence par remodeler mon valeurs pour me créer un objet au format { instrument: filtreInstrument, typeDeFiltre: filtretype, style: filtreStyle}
  const filterParams = filter.filterData.split(',')
  const [instrument = '', filterType = '', style = ''] = filterParams;
  const filterConfig = { instrument, filterType, style };
  let isEmpty = false;

  // On récupère tout les musiciens en bdd
  const musicians = await getMusicians();

  // Ici, on implémente la logique du système de filtre 
  const musiciansList = musicians.filter(musician => {
    // retourne tout les musiciens jouant de l'instrument recherché si le filtre instrument n'est pas un champ vide ( "" == All instruments)
    const hasInstrument = filterConfig.instrument != "" ? musician.instruments.includes(filterConfig.instrument) : musician.instruments;
    // retourne tout les musiciens jouant le style recherché si le filtre style n'est pas un champ vide ( "" == All styles)
    const hasStyle = filterConfig.style != "" ? musician.styles.includes(filterConfig.style) : musician.styles;

    // On gère le type de filtre
    if (filterConfig.filterType === 'AND') {
      return hasInstrument && hasStyle
    } else if (filterConfig.filterType === 'OR') {
      return hasInstrument || hasStyle
    }
    return
  })

  // Si aucun musician ne correspond aux valeurs du filtre, isEmpty passe à true
  if (musiciansList.length == 0) {
    isEmpty = true
  }

  return { musiciansList: musiciansList, isEmpty: isEmpty, filterConfig: filterConfig }
}



// récupérer les concerts du fichier data.json qui sert de bdd
export async function getConcerts() {
  // récupérer le contenu du fichier data.json
  const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
  // on le parse pour le rendre exploitable
  const data = JSON.parse(rawFileContent);
  // on ajoute les données de l'objet "musicians" sinon, on ouvre un nouvel array
  const storedConcerts = data.concerts ?? [];
  return storedConcerts;
}



// ajouter un nouveau concert
export async function storeConcert(data) {

  const newConcert = {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // pour forcer la 1ere lettre en majuscule
    address: {
      street: data.street,
      city: data.city
    },
    style: data.style.charAt(0).toUpperCase() + data.style.slice(1),
    date: data.date
  }
  // Lire le contenu actuel du fichier JSON
  const contenu = await fs.readFile('data.json', 'utf-8');
  const db = JSON.parse(contenu)

  // si note bdd contient un objet musicien, on push. Sinon, on crée un array vide
  db.concerts ? db.concerts.push(newConcert) : db.concerts = []

  // convertir les données en json pour les écrire sur le fichier data.json ensuite
  const updatedFile = JSON.stringify(db, null, 2)
  // écriture des nouvelles données dans le fichier qui nous sert de bdd 
  return fs.writeFile('data.json', updatedFile, 'utf-8')
}


// Update un concert
export async function updateConcert(data, id) {
  const updateConcert = {
    id: id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // pour forcer la 1ere lettre en majuscule
    address: {
      street: data.street,
      city: data.city
    },
    style: data.style.charAt(0).toUpperCase() + data.style.slice(1),
    date: data.date
  }

  const contenu = await fs.readFile('data.json', 'utf-8');
  const db = JSON.parse(contenu)
  let updatedFile = null

  for (let i = 0; i < db.concerts.length; i++) {
    if (updateConcert.id === db.concerts[i].id) {
      db.concerts[i] = { ...db.concerts[i], ...updateConcert } 
      updatedFile = JSON.stringify(db, null, 2)
    }
  }

  return fs.writeFile('data.json', updatedFile, 'utf-8')
}