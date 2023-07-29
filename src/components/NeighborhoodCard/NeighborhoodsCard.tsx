import React, { useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import LocationsButtons from '../LocationsButtons/LocationsButtons'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { removeNeighborhood, selectNeighborhood } from '../../store/reducers/locations'

import { NeighborhoodCardProps } from './interface'

import NeighborhoodService from '../../api/services/neighborhood'

const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({
  neighborhood: { id, name, cityId },
  stateId
}) => {
  const dispatch = useAppDispatch()
  const { neighborhood: selectedNeighborhood } = useAppSelector(
    ({ locations }) => locations.selection,
  )

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const isSelectedNeighborhood = selectedNeighborhood === id

  function handleOnCityClick() {
    dispatch(selectNeighborhood(isSelectedNeighborhood ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
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
            <LocationsButtons
              locationType="Bairro"
              onClickEdit={console.log}
              onClickDelete={toggleDeleteModal}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default NeighborhoodCard
