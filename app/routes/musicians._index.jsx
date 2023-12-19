import Navbar from '../components/Navbar';
import MusicianCard from '../components/MusicianCard';
import { Link, useLoaderData } from '@remix-run/react';
import { getMusicians, getAllInstruments, getAllStyles } from "../constants"
import MusicianFilter from '../components/MusicianFilter';


// Changer le titre de la page
export const meta = () => {
  return [{ title: "Musicians" }];
};

// loader pour charger des données 
export async function loader() {
  const musicians = await getMusicians();
  const instruments = await getAllInstruments()
  const styles = await getAllStyles();
  return { musicians: musicians, instruments: instruments, styles: styles }
}

export default function musiciansList() {
  // utiliser les données retournées par le loader
  const loaderData = useLoaderData();
  return (
    <div>
      <Navbar />
      <div className='flex bg-sky-100' >
        <MusicianFilter instrumentsList= {loaderData.instruments} stylesList={loaderData.styles}/>
      </div>
      <div className='flex justify-center'>
        <Link to="/musicians/add" className="bg-green-400 mt-4 w-1/3 flex flex-col items-center justify-center px-4 py-4 rounded-3xl drop-shadow-lg hover:bg-green-600 transition duration-400 ">
          <p className="text-xl flex text-white font-bold ">Add Musician</p>
          <p className=" text-white font-bold ">+</p>
        </Link>
      </div>
      <MusicianCard musicians={loaderData.musicians} />
    </div>
  )
}

