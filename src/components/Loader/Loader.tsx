import loading from '../../assets/loader.svg'
import s from './Loader.module.scss'

export const Loader = () => {
  return <img src={loading} alt='loading...' className={s.loader} loading='lazy' />
}
