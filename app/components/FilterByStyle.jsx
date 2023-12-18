import { useState } from "react";
import { Form } from "@remix-run/react";


export default function FilterByStyle ({ stylesList }) {
    const [selectedStyle, setselectedStyle] = useState('');

    const handleStyleChange = (event) => {
        // Si le sélecteur change
        const newStyle = event.target.value;
        setselectedStyle(newStyle);
    };

    return (
        <div className='bg-sky-100 flex items-center py-4 px-4'>
            <p className='font-bold mr-4'>Filters :</p>
            <Form method="post" action={`/musicians/${selectedStyle}`}>
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
                <button className="bg-green-300 px-2 mx-2 rounded-sm hover:bg-green-400 active:bg-green-200">Add</button>
            </Form>
        </div>
    )
}