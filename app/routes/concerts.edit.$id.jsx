import Navbar from '../components/Navbar'
import { Form } from '@remix-run/react'
import { updateConcert } from '../constants';
import { redirect } from '@remix-run/node';

// Changer le titre de la page
export const meta = () => {
    return [{ title: "Edit Concert" }];
};

export async function action({ request, params }) {
    // extraire les données du formulaire et les convertir
    const formData = await request.formData();
    const concertData = Object.fromEntries(formData);

    // passer les données du nouveau concert et son id à la fonction de stockage
    await updateConcert(concertData, params.id);
    return redirect('/concerts')
}

export default function editEvent() {
    return (
        <div className="flex flex-col items-center mt-4 justify-center mx-2 bg-white drop-shadow-lg rounded-2xl ">
            <div className="flex justify-center mt-2 mb-4">
                <h1 className="font-bold text-xl mt-4">Update an event</h1>
            </div>
            <Form method="post" className="flex flex-col justify-center items-center">
                <p className="flex items-center mb-2 mx-2 mt-2">
                    <label className="mr-2" htmlFor="name" id="name">Name: </label>
                    <input className="border-2 rounded-full px-4" type="text" placeholder="Event's name?" name="name" required />
                </p>
                <h2 className="font-bold mt-4">Adress</h2>
                <div className="flex flex-col justify-center items-start">
                    <p className="flex items-center mb-2 mx-2">
                        <label className="mr-2" htmlFor="Street" id="street">Street: </label>
                        <input className="border-2 rounded-full px-4" type="text" placeholder="Street ?" name="street" required />
                    </p>
                    <div className="flex justify-center items-center mb-8 mx-2">
                        <label for="city" className="mr-2">City: </label>
                        <select id="city" name="city" className="border-2 rounded-full px-4">
                            <option value="Saint Nolff">Saint Nolff</option>
                            <option value="london">Londres</option>
                            <option value="berlin">Berlin</option>
                            <option value="tokyo">Tokyo</option>
                        </select>
                    </div>
                </div>
                <p className="flex items-center mb-2 mx-2">
                    <label className="mr-2" htmlFor="styles" id="style">Style: </label>
                    <input className="border-2 rounded-full px-4" type="text" placeholder="Event's style ?" name="style" required />
                </p>
                <div className="flex items-center mb-2 mx-2">
                    <label for="eventDate">Event date:</label>
                    <input type="date" id="date" name="date" className="mx-2 border-2 rounded-full px-4"></input>
                </div>
                <button className="bg-green-400 rounded-lg px-2 hover:bg-green-500 my-4">Update event</button>
            </Form>

        </div>
    )
}