import Navbar from "../components/Navbar";
import MusicianCard from '../components/MusicianCard';
import ConcertCard from '../components/ConcertCard'
import { useLoaderData } from "@remix-run/react";
import { getAllStyles, getMusicians, upComingEvents } from "../constants";
import ConcertFilter from "../components/ConcertFilter";

// Changer le titre de la page
export const meta = () => {
  return [{ title: "Home" }];
};


export async function loader() {
  const musicians = await getMusicians()
  const concerts = await upComingEvents()
  const style = await getAllStyles();
  return { musicians: musicians, concerts: concerts, style: style.eventStyle }
}

export default function Index() {
  const loaderData = useLoaderData();
  return (
    <div className="bg-slate-100" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Navbar />
      <div className="mx-10 my-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <section className="flex flex-col bg-white justify-center items-center shadow-xl mx-10 rounded-xl py-4">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <ConcertFilter stylesList={loaderData.style}/>
        <ConcertCard concerts={loaderData.concerts} />
      </section>
      <section className="flex flex-col mt-4 bg-white justify-center items-center shadow-xl mx-10 rounded-xl py-4">
        <h2 className="text-2xl font-bold mt-4">All available musicians</h2>
        <MusicianCard musicians={loaderData.musicians} />
      </section>
    </div>
  );
}
