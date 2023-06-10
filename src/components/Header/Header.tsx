import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Usuários',
    link: '/users',
  },
]

const Header = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const currentLink = navLinks.find(({ link }) => link === pathname)

    document.title = `Sparklly Admin${currentLink && `- ${currentLink.label}`}`
  }, [pathname])

  return (
    <div className="p-5 bg-slate-100 rounded-2xl flex justify-between">
      <span>
        <Link className="text-2xl font-medium" to={'/'}>
          Sparklly
        </Link>
      </span>
      <div>
        <nav>
          <ul className="flex gap-3">
            {navLinks.map(({ label, link }) => (
              <li>
                <Link className="hover:no-underline underline text-xl" to={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
