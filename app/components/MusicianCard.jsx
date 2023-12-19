import { Link } from "@remix-run/react"


const MusicianCard = ({ musicians }) => {
    return (
        <main className="mx-2 sm:mx-1 md:mx-4 lg:mx-10 mt-2 justify-center">
            <div className="w-auto mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {musicians.map((data) => (
                    <div className="bg-slate-100 flex-col px-4 py-4 rounded-3xl drop-shadow-lg hover:scale-[1.02] ease-in-out duration-300">
                        {/* avatar et nom */}
                        <div className="flex justify-between items-center">
                            <div className="bg-[#345C80] rounded-full w-[64px] h-[64px] border-4 border-slate-700"></div>
                            <h2 className="font-bold pr-4">{data.name}</h2>
                        </div>

                        {/* Liste instruments */}
                        <div className="flex flex-col">
                            <div className="mt-4 mx-2 flex flex-col items-center">
                                <h3 className="text-lg mb-2">Instruments</h3>
                                <ul className="flex flex-wrap gap-2 justify-start">
                                    {data.instruments.map((instru, index) => (
                                        <li key={instru} className="bg-[#E3F2FF] rounded-full px-3 py-1 text-[#204566] font-bold">{instru}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Liste styles */}
                            <div className="mt-4 mx-2 flex flex-col items-center">
                                <h3 className="text-lg mb-2">Style</h3>
                                <ul className="flex flex-wrap gap-2 justify-start">
                                    {data.styles.map((style, index) => (
                                        <li key={style} className="bg-[#D6FFB0] rounded-full px-3 py-1 text-[#4C6634] font-bold">{style}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-center mt-6">
                                <Link to={`/musicians/edit/${data.id}`} className="bg-sky-300 px-2 rounded-lg hover:bg-sky-200 active:bg-sky-400">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default MusicianCard