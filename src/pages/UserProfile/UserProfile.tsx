import React from 'react'

import PageTitle from '../../components/PageTitle/PageTitle'
import UserProfileForm from '../../components/UserProfileForm/UserProfileForm'

const UserProfile = () => {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle text="Perfil do Usuário" />
      </div>
      <UserProfileForm />
    </>
  )
}

export default UserProfile
