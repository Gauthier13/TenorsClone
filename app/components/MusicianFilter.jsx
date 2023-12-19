import { Form } from "@remix-run/react"
import { useState } from "react";


export default function MusicianFilter({ instrumentsList, stylesList }) {
    // Initialisation des variables d'état
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [filterRelation, setFilterRelation] = useState('OR');

    // détecter le changement du filtre par instruments
    const handleInstrumentChange = (event) => {
        setSelectedInstrument(event.target.value);
    };

    // détecter le changement du filtre par styles de musique
    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value);
    };

    // détecter le changement du mode de filtre
    const handleFilterRelationChange = (event) => {
        setFilterRelation(event.target.value);
    };

    const handleSubmit = [selectedInstrument, filterRelation, selectedStyle]
    return (
        <div className='bg-sky-100 flex items-center py-4 px-4'>
            <p className='font-bold mr-4'>Filters :</p>
            <Form method="post" action={`/musicians/${handleSubmit}`} className="flex gap-4">
                
                {/* FILTRE PAR STYLES */}
                <div>
                    <label className="mx-1" htmlFor="instrumentFilter">By styles :</label>
                    <select
                        id="instrumentFilter"
                        value={selectedStyle}
                        onChange={handleStyleChange}
                    >
                        <option value="">All styles</option>
                        {stylesList.map((style) => (
                            <option key={style} value={style}>
                                {style}
                            </option>
                        ))}
                    </select>
                </div>

                {/* RELATION ENTRE LES FILTRES*/}
                <div>
                    <label className="mx-1" htmlFor="filtersRelation">AND/OR:</label>
                    <select
                        name="filtersRelation"
                        id="filtersRelation"
                        value={filterRelation}
                        onChange={handleFilterRelationChange}
                    >
                        <option value="OR">OR</option>
                        <option value="AND">AND</option>
                    </select>

                </div>


                {/* FILTRE PAR INSTRUMENTS */}
                <div>
                    <label className="mx-1" htmlFor="instrumentFilter">By instruments :</label>
                    <select
                        id="instrumentFilter"
                        value={selectedInstrument}
                        onChange={handleInstrumentChange}
                    >
                        <option value="">All instruments</option>
                        {instrumentsList.map((instrument) => (
                            <option key={instrument} value={instrument}>
                                {instrument}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="bg-green-300 px-2 mx-2 rounded-sm hover:bg-green-400 active:bg-green-200">Filter</button>
            </Form>
        </div>
    )
}