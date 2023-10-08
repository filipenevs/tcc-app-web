import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import UsersService from '../../api/services/users'
import UserProfileFormGroup from '../UserProfileFormGroup'
import UserProfileFormSectionContainer from '../UserProfileFormSectionContainer'
import ApprovedIcon from '../ApprovedIcon'

import { formatGender } from '../../utils/string'
import { formatDate, formatDateTime } from '../../utils/date'
import ApproveModal from '../ApproveModal'

const UserProfileForm = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState<any>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  useEffect(() => {
    if (!userId) return

    UsersService.getById(userId)
      .then((response) => {
        setUserData(response)
      })
      .catch(({ message }) => {
        toast.error(message)
      })
  }, [userId])

  if (!userData) return null

  console.log({ userData })

  return (
    <>
      {isConfirmOpen && (
        <ApproveModal
          closeFunction={() => setIsConfirmOpen(false)}
          userId={userData.id}
          setUserFunction={setUserData}
        />
      )}
      <div className="h-full w-full flex overflow-hidden">
        <div className="p-5 bg-slate-200 grow rounded-2xl flex flex-col gap-10 overflow-auto">
          <UserProfileFormSectionContainer title="Status">
            <UserProfileFormGroup name="status" label="Status atual">
              <div className="flex justify-between">
                <div className="w-min">
                  <ApprovedIcon status={userData.status} />
                </div>
                {userData.status === 'pending' && (
                  <div>
                    <button
                      className="rounded-md bg-gray-400 hover:bg-gray-500 px-5 font-medium text-white h-full"
                      onClick={() => setIsConfirmOpen(true)}
                    >
                      Validar Usuário
                    </button>
                  </div>
                )}
              </div>
            </UserProfileFormGroup>

            <UserProfileFormGroup name="status" label="Histórico de rejeições">
              <div>
                {userData.rejectReasons.map(({ reason, createdAt }: any) => (
                  <div className="flex border-b-2 p-1 border-gray-400 last:border-0">
                    <span className="flex-grow">{reason}</span>
                    <span>{formatDateTime(new Date(createdAt))}</span>
                  </div>
                ))}
              </div>
            </UserProfileFormGroup>
          </UserProfileFormSectionContainer>

          <UserProfileFormSectionContainer title="Informações Pessoais">
            <div className="flex gap-4">
              <UserProfileFormGroup name="name" label="Nome" value={userData.name} />
              <UserProfileFormGroup
                name="surname"
                label="Sobrenome"
                value={userData.surname}
              />
            </div>
            <div className="flex gap-4">
              <UserProfileFormGroup name="cpf" label="CPF" value={userData.cpf} />
              <UserProfileFormGroup name="email" label="E-mail" value={userData.email} />
            </div>
            <div className="flex gap-4">
              <UserProfileFormGroup
                name="gender"
                label="Gênero"
                value={formatGender(userData.gender)}
              />
              <UserProfileFormGroup
                name="birthDate"
                label="Data de nascimento"
                value={formatDate(new Date(userData.birthDate))}
              />
            </div>
          </UserProfileFormSectionContainer>

          <UserProfileFormSectionContainer title="Endereço de residência">
            <div className="flex gap-4">
              <UserProfileFormGroup
                name="addressDescription"
                label="Logradouro"
                value={userData.address.description}
              />
            </div>
            <div className="flex gap-4">
              <UserProfileFormGroup
                name="number"
                label="Número"
                value={userData.address.number}
              />
              <UserProfileFormGroup
                name="state"
                label="Estado"
                value={userData.address.neighborhood.city.state.name}
              />
            </div>
            <div className="flex gap-4">
              <UserProfileFormGroup
                name="city"
                label="Cidade"
                value={userData.address.neighborhood.city.name}
              />
              <UserProfileFormGroup
                name="neighborhood"
                label="Bairro"
                value={userData.address.neighborhood.name}
              />
            </div>
          </UserProfileFormSectionContainer>
        </div>
      </div>
    </>
  )
}

export default UserProfileForm
