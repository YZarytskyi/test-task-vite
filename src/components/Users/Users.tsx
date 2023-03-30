import { FC, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { getUsers } from '../../api/api'
import { IUser } from '../../types'
import { numberTransform } from '../../utils/formatNumber'
import { Loader } from '../Loader/Loader'
import 'react-tooltip/dist/react-tooltip.css'
import s from './Users.module.scss'
import { handleImageError } from '../../utils/imageErrorHandler'

interface UsersProps {
  isRegisterSuccess: boolean
}

export const Users: FC<UsersProps> = ({ isRegisterSuccess }) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers(page)
  }, [page])

  useEffect(() => {
    if (!isRegisterSuccess) {
      return
    }
    if (page === 1) {
      fetchUsers(page)
      return
    }
    setPage(1)
  }, [isRegisterSuccess])

  async function fetchUsers(page = 1) {
    try {
      setIsLoading(true)
      const data = await getUsers(page)
      setTotalPages(data.total_pages)
      setUsers((prev) => (page === 1 ? data.users : [...prev, ...data.users]))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onClickShowMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <section id='users' className={s.users}>
      <div className='container'>
        <h2 className='subTitle'>Working with GET request</h2>
        <ul className={s.usersList}>
          {users.map((user) => (
            <li key={user.id} className={s.userCard}>
              <img
                src={user.photo}
                alt={user.name}
                className={s.userImage}
                width={70}
                height={70}
                onError={handleImageError}
                loading='lazy'
              />
              <p
                className={s.userName}
                data-tooltip-id='my-tooltip'
                data-tooltip-content={user.name}
              >
                {user.name}
              </p>
              <p className={s.userPosition}>{user.position}</p>
              <a
                href={`mailto:${user.email}`}
                data-tooltip-id='my-tooltip'
                data-tooltip-content={user.email}
                className={s.userEmail}
              >
                {user.email}
              </a>
              <a href={`tel:${user.phone}`} className={s.userPhone}>
                {numberTransform(user.phone)}
              </a>
              <Tooltip
                id='my-tooltip'
                place='bottom'
                content={user.email}
                className={s.tooltip}
                noArrow
              />
            </li>
          ))}
        </ul>
        <button
          type='button'
          style={page === totalPages ? { display: 'none' } : {}}
          className={`link ${s.showMoreBtn}`}
          onClick={onClickShowMore}
        >
          Show more
        </button>
        {isLoading && <Loader />}
      </div>
    </section>
  )
}
