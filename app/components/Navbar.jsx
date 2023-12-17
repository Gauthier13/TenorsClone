import { NavbarLinks } from "../constants"
import { Link, Form } from "@remix-run/react"
import logo from '../assets/images/logo.svg'
import hamburger from '../assets/icons/hamburger.svg'

const Navbar = () => {
    let isOpen = false
    return (
        <nav className="flex justify-between items-center z-10 px-10 py-5 bg-[#E3F2FF] drop-shadow-lg">
            {/* LOGO LANDING PAGE */}
            <Link to="/">
                <img src={logo} alt="logo" width={40} height={40} />
            </Link>
            {/* LIENS DE LA NAVBAR */}
            <div className="hidden gap-12 lg:flex">
                {NavbarLinks.map((link) => (
                    <Link id={link.id} to={link.href} key={link.key} className="text-lg text-[#061E33] hover:underline hover:underline-offset-4 target:bg-pink-500">
                        {link.label}
                    </Link>
                ))}
            </div>
            {/*BOUTON LOGOUT*/}
            <div>
                <Link className="max-lg:hidden bg-[#204566] px-4 py-2 text-slate-50 rounded-lg hover:bg-[#061E33] hover:drop-shadow">
                    LogOut
                </Link>
            </div>
            {/*MENU BURGER, il apparaît sur les petits écrans et est caché sur les grands*/}
            <img
                src={hamburger}
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer lg:hidden"
            />
        </nav>
    )
}
export default Navbar


