import { Form } from "@remix-run/react";
import Navbar from "../components/Navbar"
import { storeMusician } from "../constants";
import { v4 as uuidv4 } from 'uuid';
import { redirect } from '@remix-run/node'


// Changer le titre de la page
export const meta = () => {
  return [{ title: "Add Musician" }];
};


export async function action({ request }) {
  // extraire les données du formulaire et les convertir
  const formData = await request.formData();
  const musicianData = Object.fromEntries(formData);

  // Générer un nouvel id unique pour le nouveau musicien
  const nouvelId = uuidv4();
  musicianData.id = nouvelId;

  // passer les données du nouveau musicien à la fonction de stockage
  await storeMusician(musicianData);

  return redirect('/musicians')
}

export default function addMusician() {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center mt-2">
        <h1 className="font-bold text-xl">Add a musician</h1>
      </div>
      <div className="flex flex-col items-center mt-4 justify-center mx-2 bg-white drop-shadow-lg rounded-2xl ">

        <Form method="post">
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

          <button className="bg-green-400 rounded-lg px-2 hover:bg-green-500 mt-4">Add musician</button>
        </Form>

      </div>
    </main>
  )
}

