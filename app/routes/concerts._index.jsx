import { useLoaderData } from "@remix-run/react";
import ConcertCard from "../components/ConcertCard";
import Navbar from "../components/Navbar";
import { getConcerts } from "../constants";
import { Link } from "@remix-run/react";
// Changer le titre de la page
export const meta = () => {
    return [{ title: "Concerts" }];
};

export async function loader() {
    const concerts = await getConcerts();
    console.log("concerts: " + JSON.stringify(concerts, null, 2));
    return concerts
}

export default function concertsList() {
    const loaderData = useLoaderData()
    return (
        <div>
            <Navbar />
            <div className='flex justify-center mt-4'>
                <Link to="/concerts/add" className="bg-green-400 mt-4 w-1/3 flex flex-col items-center justify-center px-4 py-4 rounded-3xl drop-shadow-lg hover:bg-green-600 transition duration-400 ">
                    <p className="text-xl flex text-white font-bold ">Add Event</p>
                    <p className=" text-white font-bold ">+</p>
                </Link>
            </div>
            <div className="flex justify-center mt-10">
                <h2 className="text-2xl font-bold">All concerts</h2>
            </div>
            <ConcertCard concerts={loaderData} />
        </div>
    )
}

