import { useEffect, useState } from 'react'
import { getUsers } from '../../api/usersApi'
import { IUser } from '../../types'
import s from './Users.module.scss'

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(page)
        setTotalPages(data.total_pages)
        setUsers((prev) => (page === 1 ? data.users : [...prev, ...data.users]))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [page])

  const onClickShowMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <section className={s.users}>
      <div className='container'>
        <h2 className={s.heading}>Working with GET request</h2>
        <ul className={s.usersList}>
          {users.map((user) => (
            <li key={user.id} className={s.userCard}>
              <img
                src={user.photo}
                alt={user.name}
                className={s.userImage}
                width={70}
                height={70}
              />
              <p className={s.userName}>{user.name}</p>
              <p>{user.position}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
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
      </div>
    </section>
  )
}
