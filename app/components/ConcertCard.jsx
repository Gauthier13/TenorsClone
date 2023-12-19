import { Link } from "@remix-run/react"

export default function ConcertCard({ concerts }) {
    return (
        <main className="mx-2 sm:mx-1 md:mx-4 lg:mx-10 mt-2 justify-center">
            <div className="w-auto mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {
                    concerts.map((data) => (
                        <div className=" bg-gradient-to-b from-[#c31432] to-[#240b36] flex-col px-4 py-4 rounded-3xl drop-shadow-lg hover:scale-[1.02] ease-in-out duration-300">
                            <div className="flex justify-center items-center">
                                <h2 className="font-bold text-white text-2xl">{data.name}</h2>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-10">
                                <h3 className="font-bold text-white text-xl">Address</h3>
                                <p className="text-white">{data.address.street}, <span>{data.address.city}</span></p>
                                <p className="text-white mt-1">{data.date}</p>
                                <p className="mt-4 bg-slate-50 font-bold text-black px-4 rounded-full drop-shadow-lg">{data.style}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-10">
                                <Link to={`/concerts/edit/${data.id}`} className="bg-sky-300 px-2 rounded-lg hover:bg-sky-200 active:bg-sky-400">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))
                }

            </div>
        </main>
    )
}