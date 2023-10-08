import React, { useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { removeNeighborhood, selectNeighborhood } from '../../store/reducers/locations'

import { NeighborhoodCardProps } from './interface'

import NeighborhoodService from '../../api/services/neighborhood'
import NeighborhoodForm from '../NeighborhoodForm/NeighborhoodForm'

const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({ neighborhood, stateId }) => {
  const dispatch = useAppDispatch()
  const { neighborhood: selectedNeighborhood } = useAppSelector(
    ({ locations }) => locations.selection,
  )

  const { id, name, cityId } = neighborhood

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const isSelectedNeighborhood = selectedNeighborhood === id

  function handleOnCityClick() {
    dispatch(selectNeighborhood(isSelectedNeighborhood ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
  }

  function toggleEditModal() {
    setIsEditOpen((prevValue) => !prevValue)
  }

  function handleOnConfirmDelete() {
    NeighborhoodService.delete(id)
      .then(() => {
        dispatch(removeNeighborhood({ stateId, cityId, neighborhoodId: id }))
        toast.success('Bairro excluído com sucesso!')
      })
      .catch(({ message }) => {
        toast.error(message)
      })
      .finally(() => {
        setIsDeleteOpen(false)
      })
  }

  return (
    <>
      {isDeleteOpen && (
        <ConfirmModal
          content="Deseja realmente excluir o bairro selecionado?"
          confirmButtonAction={handleOnConfirmDelete}
          cancelButtonAction={toggleDeleteModal}
        />
      )}
      {isEditOpen && (
        <NeighborhoodForm
          neighborhood={neighborhood}
          closeFunction={toggleEditModal}
          stateId={stateId}
        />
      )}
      <button
        className={classNames(
          'p-4 rounded-xl font-bold border-4 border-slate-300 hover:bg-slate-300 cursor-pointer text-left',
          { 'bg-slate-300': isSelectedNeighborhood },
        )}
        onClick={handleOnCityClick}
      >
        {name}
      </button>
      {isSelectedNeighborhood && (
        <div className="flex flex-col ml-10 gap-2">
          <div className="flex justify-end">
            <div className="flex gap-2">
              <button
                className="rounded-md bg-blue-500 hover:bg-blue-600 py-2 px-5 font-medium text-white"
                onClick={toggleEditModal}
              >
                Editar Bairro
              </button>
              <button
                className="rounded-md bg-red-500 hover:bg-red-600 py-2 px-5 font-medium text-white"
                onClick={toggleDeleteModal}
              >
                Excluir Bairro
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NeighborhoodCard
