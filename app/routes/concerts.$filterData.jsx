import { useActionData, useLoaderData } from "@remix-run/react";
import Navbar from "../components/Navbar";
import { filterConcert } from "../constants";
import ConcertCard from "../components/ConcertCard";
import ConcertFilter from "../components/ConcertFilter";
import { getAllStyles } from "../constants";


// Changer le titre de la page
export const meta = () => {
    return [{ title: "Concerts by style" }];
};

export async function action({ params }) {
    console.log("params: " + JSON.stringify(params.filterData, null, 2));
    const concertFilteredData = await filterConcert(params.filterData)
    return concertFilteredData
}


export async function loader() {
    const style = await getAllStyles();
    return { style: style.eventStyle }
  }

export default function concertsByStyle() {
    const actionData = useActionData()
    const loaderData = useLoaderData()
    return (
        <main>
            <Navbar />
            <div className="flex flex-col bg-white justify-center items-center shadow-xl mx-10 mt-10 rounded-xl py-4">
                <h1 className="text-2xl font-bold">Upcoming <span className="text-red-400">{actionData.style}</span> Events</h1>
                <ConcertFilter stylesList={loaderData.style} />
                <ConcertCard concerts={actionData.concertByStyle} />
            </div>
        </main>
    )
}