import { useAppSelector } from '../../hooks/redux'
import UserCard from '../UserCard/UserCard'

const UsersList = () => {
  const { data } = useAppSelector((state) => state.users)

  return (
    <div className="h-full w-full flex">
      <div className="p-5 bg-slate-200 grow rounded-2xl flex flex-col gap-2">
        <div className="grid grid-cols-6 px-3 py-1 rounded-lg bg-slate-300 cursor-pointer">
          <span>Nome</span>
          <span>E-mail</span>
          <span>CPF</span>
          <span>Aprovação</span>
        </div>
        {data &&
          data.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              surname={user.surname}
              email={user.email}
              cpf={user.cpf}
              gender={user.gender}
              birthDate={new Date(user.birthDate)}
              createdAt={new Date(user.createdAt)}
              approved={user.approved}
            />
          ))}
      </div>
    </div>
  )
}

export default UsersList
