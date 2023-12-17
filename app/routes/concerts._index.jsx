import Navbar from "../components/Navbar";

// Changer le titre de la page
export const meta = () => {
    return [{ title: "Concerts" }];
};


export default function concertsList () {
    return (
        <div>
            <Navbar />
        </div>
    )
}

