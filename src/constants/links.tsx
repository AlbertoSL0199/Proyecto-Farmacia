
import { FaXTwitter,FaFacebook, FaInstagram, FaTiktok, FaBoxOpen, FaCartShopping } from "react-icons/fa6"

export const navbarlinks = [
    {
        id: 1,
        title: 'INICIO',
        href: '/',
    },
    {
        id: 2,
        title: 'MEDICAMENTOS',
        href: '/medicamentos',
    },
    {
        id: 3,
        title: 'PARAFARMACIA',
        href: '/parafarmacias',
    },
    {
        id: 4,
        title: 'ORTOPEDIA',
        href: '/ortopedias',
    },
    {
        id: 5,
        title: 'SOBRE NOSOTROS',
        href: '/nosotros',
    },
]

export const navbarmobilinks = [
    {
        id: 1,
        title: 'INICIO',
        href: '/',
    },
    {
        id: 2,
        title: 'MEDICAMENTOS',
        href: '/medicamentos',
    },
    {
        id: 3,
        title: 'PARAFARMACIA',
        href: '/parafarmacias',
    },
    {
        id: 4,
        title: 'ORTOPEDIA',
        href: '/ortopedias',
    },
    {
        id: 5,
        title: 'SOBRE NOSOTROS',
        href: '/nosotros',
    },
    {
        id: 6,
        title: 'ENVIOS Y DEVOLUCIONES',
        href: '/envios',
    },
    {
        id: 7,
        title: 'CONTACTO',
        href: '/contacto',
    },
]


export const dashboardlinks = [
    {
        id: 1,
        title: 'Productos',
        href: '/dashboard/productos',
        icons: <FaBoxOpen size={22}/>
    },
    {
        id: 2,
        title: 'Ordenes',
        href: '/dashboard/ordenes',
        icons: <FaCartShopping size={22}/>
    },
]

export const sociaLinks = [
    {
        id: 1,
        title: 'Facebook',
        href: 'https://www.facebook.com/',
        icon: <FaFacebook/>,
    },
    {
        id: 2,
        title: 'Twitter',
        href: 'https://x.com/',
        icon: <FaXTwitter/>,
    },
    {
        id: 3,
        title: 'Instagram',
        href: 'https://www.instagram.com/',
        icon: <FaInstagram/>,
    },
    {
        id: 4,
        title: 'TikTok',
        href: 'https://www.tiktok.com/es/',
        icon: <FaTiktok/>,
    },
]