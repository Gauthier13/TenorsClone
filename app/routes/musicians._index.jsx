import Navbar from '../components/Navbar';
import MusicianCard from '../components/MusicianCard';
import { Link, useLoaderData } from '@remix-run/react';
import { getMusicians } from "../constants"

// Changer le titre de la page
export const meta = () => {
  return [{ title: "Musicians" }];
};


// loader pour charger des données 
export async function loader() {
    // appel de getMusicians() qui retourne les musiciens déjà enregistrés
    const musicians = await getMusicians();
    return musicians
}


export default function musiciansList() {
  // utiliser les données retournées par le loader
  const musicians = useLoaderData();
  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <Link to="/musicians/add" className="bg-green-400 mt-4 w-1/3 flex flex-col items-center justify-center px-4 py-4 rounded-3xl drop-shadow-lg hover:bg-green-600 transition duration-400 ">
          <p className="text-xl flex text-white font-bold ">Add Musician</p>
          <p className=" text-white font-bold ">+</p>
        </Link>
      </div>
      <MusicianCard musicians={musicians}/>
    </div>
  )
}

