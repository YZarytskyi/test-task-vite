import { FC, memo } from 'react'
import logo from '../../assets/logo.png'
import s from './Header.module.scss'

export const Header: FC = memo(() => {
  return (
    <header>
      <nav className={`container ${s.nav}`}>
        <a href='/' className={s.logoLink}>
          <img src={logo} alt='logo' width={104} height={26} />
        </a>
        <div className={s.links}>
          <a href='#users' className='link'>
            Users
          </a>
          <a href='#signUp' className='link'>
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  )
})
