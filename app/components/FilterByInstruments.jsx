import { useState } from "react";
import { Form } from "@remix-run/react";


// Composant filtre par instrument
// Je ne sais pas si c'est la manière la plus élégante de le faire
// Le <select> est couplé à un bouton, le tout de dans un Form (Une upgrade serait de soumettre le Form lorsque le select change, mais cela force la navigation alors il faudrait l'implémenter différemment)
// Au post, le Form conduit à une nouvelle page avec un segment dynamique 
// Ce params est ensuite passé en argument dans ma fonction de filtre
export default function FilterByInstruments({ instrumentsList }) {
    const [selectedInstrument, setSelectedInstrument] = useState('');

    const handleInstrumentChange = (event) => {
        // Si le sélecteur change
        const newInstrument = event.target.value;
        setSelectedInstrument(newInstrument);
    };

    return (
        <div className='bg-sky-100 flex items-center py-4 px-4'>
            <p className='font-bold mr-4'>Filters :</p>
            <Form method="post" action={`/musicians/${selectedInstrument}`}>
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
                <button className="bg-green-300 px-2 mx-2 rounded-sm hover:bg-green-400 active:bg-green-200">Add</button>
            </Form>
        </div>
    )
}