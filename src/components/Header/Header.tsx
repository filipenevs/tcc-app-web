import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="p-5 bg-slate-100 rounded-2xl flex justify-between">
      <span>
        <Link className="text-2xl font-medium" to={'/'}>
          Sparklly
        </Link>
      </span>
    </div>
  )
}

export default Header
