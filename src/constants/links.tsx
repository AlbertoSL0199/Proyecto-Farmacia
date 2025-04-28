
import { FaXTwitter,FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6"

export const navbarlinks = [
    {
        id: 1,
        title: 'INICIO',
        href: '/',
    },
    {
        id: 2,
        title: 'MEDICAMENTOS',
        href: '/medicamento',
    },
    {
        id: 3,
        title: 'PARAFARMACIA',
        href: '/parafarmacia',
    },
    {
        id: 4,
        title: 'ORTOPEDIA',
        href: '/ortopedia',
    },
    {
        id: 5,
        title: 'SOBRE NOSOTROS',
        href: '/nosotros',
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