import { useActionData, useLoaderData } from "@remix-run/react"
import { filterInstrument } from "../constants";
import MusicianCard from "../components/MusicianCard";
import Navbar from "../components/Navbar";
import FilterByInstruments from "../components/FilterByInstruments";
import { getMusicians, getAllInstruments } from "../constants";

export async function action({ params }) {
    // récupérer les musiciens qui correspondent au filtre 
    const dataFilter = await filterInstrument(params)
    return { musicians: dataFilter, intrumentName: params.instruments }
}

// loader pour charger des données 
export async function loader() {
    const musicians = await getMusicians();
    const instruments = await getAllInstruments()
    return { musicians: musicians, instruments: instruments }
}

export default function musiciansByInstrument() {
    const data = useActionData()
    const loaderData = useLoaderData();
    return (
        <main>
            <Navbar />
            <FilterByInstruments instrumentsList={loaderData.instruments}/>
            <div className="flex justify-center mt-4 py-4 mb-4">
                <h2 className="text-xl">Here's some musicians who knows how to play <span className="font-bold text-xl">{data.intrumentName}</span> !</h2>
            </div>
            <MusicianCard musicians={data.musicians} />
        </main>
    )
}