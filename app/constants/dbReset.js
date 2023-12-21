// Pour accéder au système de fichiers
import fs from 'fs/promises';

// Les liens de la nav bar
// Je les déclare ici dans le but de venir les afficher dans mon composant ensuite.
// Cela me permet d'avoir un seul fichier à modifer si jamais je veux ajouter/supprimer un lien dans la navbar.
export const NavbarLinks = [
  { href: '/musicians', key: 'Musicians', label: 'Add Musicians', id: 'musicians' },
  { href: '/concerts', key: 'Concerts', label: 'Add Concerts', id: 'concerts' },
];




// -----------------  LES FONCTIONS QUI SIMULENT LA CONNEXION À UNE BDD  -------------------------- //


//---------------    Créer une copie du fichier data.json pour que tout se réinitialise à la fermeture du navigateur.
// Toute la logique implémenter dans ce fichier fonctionne à 99% !

// Ce qui bloque : le système de filtre musiciens et concerts ne fonctionne plus. Ce système fonctionne avec des params que je viens piocher dans l'URL mais je ne comprends pas pourquoi la logique ne fonctionne plus ici et les params sont vides. Les fonctions ici sont identiques à celles du fichier index.js à la différence près qu'ici on se base sur une copie du data.json et qu'on le ne le manipule plus du tout ensuite (dans le but que tout se réinitialise aux valeurs initiales au redémmarage)   -----------------------------------//



// Créer une copie du fichier data.json qui sert de bdd
const rawFileContent = await fs.readFile('data.json', { encoding: 'utf-8' });
// on le parse pour le rendre exploitable
const data = JSON.parse(rawFileContent);
export let db = data;


// récupérer les musiciens du fichier data.json qui sert de bdd
export async function getMusicians() {
  const storedMusicians = db.musicians
  return storedMusicians;
}


// Récupérer tout les instruments 
export async function getAllInstruments() {
  const instrumentsList = db.musicians.reduce((instrumentsArray, musician) => {
    return instrumentsArray.concat(musician.instruments)
  }, []);
  const allInstruments = [...new Set(instrumentsList)]
  return allInstruments
}





// Récupérer tout les styles de musique parmis les musiciens
export async function getAllStyles() {

  // récupérer les styles des musiciens
  const stylesList = db.musicians.reduce((musicianStyleArray, musician) => {
    return musicianStyleArray.concat(musician.styles)
  }, []);

  // récupérer les styles des concerts à venir car ce filtre ne sera présent que sur la homepage
  const upComingEventStyle = await upComingEvents() // cette fonction est déclarée plus bas 
  const concertStyle = upComingEventStyle.reduce((concertArray, concert) => {
    return concertArray.concat(concert.style)
  }, []);

  // générer de nouveaux array avec les valeurs filtrées
  const eventStyle = [... new Set(concertStyle)]
  const musicianStyle = [...new Set(stylesList)]

  return { musicianStyle: musicianStyle, eventStyle: eventStyle }
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

  // si note bdd contient un objet musicien, on push. Sinon, on crée un array vide
  db.musicians ? db.musicians.push(newMusician) : db.musicians = []

  return console.log("Le profil de musicien a été ajouté");
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

  // Ici on filtre la bdd pour récupérer l'id qui match avec celui de notre edit 
  // Il existe probablement une manière plus élégante de filtrer
  for (let i = 0; i < db.musicians.length; i++) {
    if (updateMusician.id === db.musicians[i].id) {
      db.musicians[i] = { ...db.musicians[i], ...updateMusician } // A chaque fois que j'utilise un spread operator j'ai l'impression de faire quelque chose de bien
    }
  }
  return console.log("Le profil de musician a été mis à jour")
}



// système de filtre des musiciens
export async function filterMusicians(filter) {
  // L'argument filter de la fonciton déclarée ci-dessus arrive sous forme de string contenant les valeurs du filtre séparées par des virgules, exemple: ("Rock,OR,Guitar")
  // Je commence par remodeler les valeurs pour me créer un objet au format { instrument: filtreInstrument, typeDeFiltre: filtretype, style: filtreStyle}
  const filterParams = filter.filterData.split(',')
  const [instrument = '', filterType = '', style = ''] = filterParams;
  const filterConfig = { instrument, filterType, style };
  let isEmpty = false;
  console.log(filterConfig);

  // On récupère tout les musiciens en bdd
  const musicians = await db.musicians

  // Ici, on implémente toute la logique du système de filtre 
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
  return { musiciansList: musiciansList, isEmpty: isEmpty, filterConfig: filterConfig } // cette fonction retourne alors un objet qui contient toutes les infos demandées
}





// récupérer les concerts du fichier data.json qui sert de bdd
export async function getConcerts() {
  const storedConcerts = db.concerts ?? [];
  return storedConcerts;
}




// Retourne les concerts par date de la plus proche à la plus éloignée en retirant les évènements antérieurs à la date du jour
export async function upComingEvents() {
  const storedConcerts = db.concerts
  // Ici on implémente la logique permettant de trier les concerts par date, du plus récent au moins récent en retirant les concerts déjà passés
  const currentDate = new Date(); // sert de point de comparaison pour le filter ensuite
  const upComingEvents = storedConcerts
    .filter(event => new Date(event.date) >= currentDate) // 2e étape :les concerts ayants une date futur à la date du jour (currentDate) sont retournés
    .sort((a, b) => { // 1ère étape : logique de classement des concerts des plus récents au moins récents en comparant 2 dates
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; // ça fonctionne bien !
    });
  return upComingEvents;
}



// stocker un nouveau concert
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
  // si note bdd contient un objet concerts, on push. Sinon, on crée un array vide
  db.concerts ? db.concerts.push(newConcert) : db.concerts = []

  return console.log("Le concert a été ajouté");
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

  // même logique que pour la fonction updateMusician déclarée plus haut 
  for (let i = 0; i < db.concerts.length; i++) {
    if (updateConcert.id === db.concerts[i].id) {
      db.concerts[i] = { ...db.concerts[i], ...updateConcert }
    }
  }
  return console.log("Le concert a été mis à jour");
}




// Retourne les concerts qui match le style du filtre 
export async function filterConcert(style) {
  const concerts = await upComingEvents();
  const concertByStyle = concerts.filter(concert => concert.style === style)
  return { concertByStyle: concertByStyle, style: style }
}




// DELETE Event
export async function deleteEvent(id) {
  const concertId = db.concerts.findIndex(concert => concert.id === id); // Retourne le concert qui match l'id ou -1 si aucun ne correspond

  if (concertId !== -1) {
    db.concerts.splice(concertId, 1)   // Suppression du concert à l'id correspondante
  }
  return console.log("Le concert a été supprimé");
}





// DELETE Musician
export async function deleteMusician(id) {
  const musicianId = db.musicians.findIndex(musician => musician.id === id); // Retourne le concert qui match l'id ou -1 si aucun ne correspond
  if (musicianId !== -1) {
    db.musicians.splice(musicianId, 1)   // Suppression du concert à l'id correspondante
  }
  return console.log("Le musicien a été supprimé");
}