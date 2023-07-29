import React, { useState } from 'react'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { NeighborhoodCardProps } from './interface'
import { selectNeighborhood } from '../../store/reducers/locations'
import LocationsButtons from '../LocationsButtons/LocationsButtons'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({
  neighborhood: { id, name },
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

  function handleOnConfirmDelete() {}

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
