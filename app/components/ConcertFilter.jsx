import { Form } from "@remix-run/react"
import { useState } from "react";

// Ce composant a un fonctionnement identique au composant MusicianFilter.jsx
export default function ConcertFilter({ stylesList }) {

    const [selectedStyle, setSelectedStyle] = useState('');
    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value);
    };

    return (
        <div>
            <Form method="post" action={`/concerts/${selectedStyle}`} className="flex gap-4 mt-2">
                {/* FILTRE PAR STYLES */}
                <div>
                    <label className="mx-1" htmlFor="instrumentFilter"></label>
                    <select
                        className="border-2 px-4 py-1 rounded-full"
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

                {selectedStyle != '' ? <button className="bg-green-300 px-2 mx-2 rounded-sm hover:bg-green-400 active:bg-green-200">Filter</button> : null}

            </Form>
        </div>
    )
}