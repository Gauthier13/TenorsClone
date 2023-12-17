import Navbar from '../components/Navbar'
import { Form, useActionData } from '@remix-run/react'
import { updateMusician } from '../constants';
import { redirect } from '@remix-run/node';
import { useSubmit, useParams } from '@remix-run/react';


// Changer le titre de la page
export const meta = () => {
    return [{ title: "Edit Musician" }];
};


export async function action({ request, params }) {
    // extraire les données du formulaire et les convertir
    const formData = await request.formData();
    const musicianData = Object.fromEntries(formData);

    // passer les données du nouveau musicien et son id à la fonction de stockage
    await updateMusician(musicianData, params.id);

    return redirect('/musicians')
}

export async function loader ({ params }) {

    return null
}

const editMusician = () => {
    return (
        <main>
            <Navbar />
            <div className="flex justify-center mt-4">
                <h1 className="font-bold text-xl">Edit musician's informations</h1>
            </div>
            <div className="flex flex-col items-center mt-4 justify-center mx-2 bg-white drop-shadow-lg rounded-2xl ">

                <Form
                    method="post"
                >
                    <p className="flex items-center mb-2 mx-2 mt-2">
                        <label className="mr-2" htmlFor="name" id="name">Name: </label>
                        <input className="border-2 rounded-full px-4" type="text" placeholder="What's your name ?" name="name" required />
                    </p>
                    <p className="flex items-center mb-2 mx-2">
                        <label className="mr-2" htmlFor="instruments" id="Instruments">Instruments: </label>
                        <input className="border-2 rounded-full px-4" type="text" placeholder="What do you play ?" name="instruments" required />
                        <p className="mx-2">Separate each instrument by a ","</p>
                    </p>
                    <p className="flex items-center mb-2 mx-2">
                        <label className="mr-2" htmlFor="styles" id="styles">Styles: </label>
                        <input className="border-2 rounded-full px-4" type="text" placeholder="What is your style ?" name="styles" required />
                        <p className="mx-2">Separate each style by a ","</p>
                    </p>
                    <button className="bg-green-400 rounded-lg px-2 hover:bg-green-500 mt-4">Update</button>
                </Form>

            </div>
        </main>
    )
}

export default editMusician