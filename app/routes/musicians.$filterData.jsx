import { Link, useActionData, useLoaderData, useRouteError } from "@remix-run/react"
import MusicianCard from "../components/MusicianCard";
import Navbar from "../components/Navbar";
import { getMusicians, getAllInstruments, getAllStyles } from "../constants";
import { filterMusicians } from "../constants";
import MusicianFilter from "../components/MusicianFilter";


// Changer le titre de la page
export const meta = () => {
    return [{ title: "Musicians" }];
}; 


export async function action({ params }) {
    // récupérer les musiciens qui correspondent au filtre 
    const dataIsFilter = await filterMusicians(params)
    console.log(dataIsFilter);
    return { musicians: dataIsFilter.musiciansList, isEmpty: dataIsFilter.isEmpty, filterConfig: dataIsFilter.filterConfig }
}

// loader pour charger des données nécessaire au fonctionnement des composants 
export async function loader() {
    const musicians = await getMusicians();
    const instruments = await getAllInstruments()
    const styles = await getAllStyles();
    return { musicians: musicians, instruments: instruments, styles: styles.musicianStyle }
}

export default function musiciansByInstrument() {
    const data = useActionData();
    const loaderData = useLoaderData();
    return (
        <main>
            <Navbar />
            <div className='flex bg-sky-100' >
                <MusicianFilter instrumentsList={loaderData.instruments} stylesList={loaderData.styles} />
            </div>
            <div className="flex justify-center mt-4 py-4 mb-4">
                {data.isEmpty ?
                    <div className="flex flex-col items-center justify-center">
                        <p>Ho Ho, looks like nobody can handle that !</p>
                        <Link to="/musicians" className="px-2 bg-sky-200 rounded-sm mt-2 hover:bg-sky-300 active:bg-sky-100">
                            Back
                        </Link>
                    </div> :
                    <h2 className="text-xl">Here's some musicians who knows how to play
                        <span className="font-bold text-xl text-red-400"> {data.filterConfig.style != "" ? data.filterConfig.style : " All styles"}</span>
                        <span className="font-bold text-3xl text-red-400"> {data.filterConfig.filterType} </span>
                        <span className="font-bold text-xl text-red-400"> {data.filterConfig.instrument != "" ? data.filterConfig.instrument : "All instruments"} </span>
                        !
                    </h2>
                }
            </div>
            <MusicianCard musicians={data.musicians} />
        </main>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();
    return <div>{error.message}</div>;
}