import { useLayoutEffect } from 'react'

import PageTitle from '../../components/PageTitle/PageTitle'

import { useAppDispatch } from '../../hooks/redux'
import { initLoading, insertUsersData } from '../../store/reducers/users'

import UsersService from '../../api/services/users'
import UsersList from '../../components/UsersLists/UsersList'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'

const Users = () => {
  const dispatch = useAppDispatch()

  async function getUsers() {
    dispatch(initLoading())
    const usersResponse = await UsersService.getAllUsers()
    dispatch(insertUsersData(usersResponse))
  }

  useLayoutEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <PageTitle text="Usuários" />
        <div className="flex gap-3">
          <button className="rounded-md bg-slate-200 py-2 px-5 font-medium border-4 border-slate-200 hover:border-slate-300">
            Adicionar filtros
          </button>
          <button
            className="rounded-md bg-slate-300 py-2 px-5 font-medium border-4 border-slate-300 hover:border-slate-400"
            onClick={getUsers}
          >
            Procurar
          </button>
        </div>
      </div>
      <UsersList />
    </>
  )
}

export default Users
