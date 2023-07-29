import React, { useState } from 'react'
import classNames from 'classnames'

import NeighborhoodCard from '../NeighborhoodCard/NeighborhoodsCard'
import LocationsFilter from '../LocationsFilter/LocationsFilter'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import LocationsButtons from '../LocationsButtons/LocationsButtons'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { selectCity } from '../../store/reducers/locations'

import { CityCardProps } from './interface'

const CityCard: React.FC<CityCardProps> = ({ city: { id, name, neighborhoods } }) => {
  const dispatch = useAppDispatch()
  const { city: selectedCity } = useAppSelector(({ locations }) => locations.selection)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [neighborhoodQuery, setNeighborhoodQuery] = useState('')

  const isSelectedCity = selectedCity === id

  const filteredNeighborhoods = neighborhoods.filter(({ name }) =>
    name.toLowerCase().includes(neighborhoodQuery),
  )

  function handleOnCityClick() {
    dispatch(selectCity(isSelectedCity ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
  }

  function handleOnConfirmDelete() {}

  return (
    <>
      {isDeleteOpen && (
        <ConfirmModal
          content="Deseja realmente excluir a cidade selecionada?"
          confirmButtonAction={handleOnConfirmDelete}
          cancelButtonAction={toggleDeleteModal}
        />
      )}
      <button
        className={classNames(
          'p-4 rounded-xl font-bold border-4 border-slate-300 hover:bg-slate-300 cursor-pointer text-left',
          { 'bg-slate-300': isSelectedCity },
        )}
        onClick={handleOnCityClick}
      >
        {name}
      </button>
      {isSelectedCity && (
        <div className="flex flex-col ml-10 gap-2">
          <div className="flex justify-between">
            <LocationsFilter
              locationType=" Bairros"
              onChangeFilter={setNeighborhoodQuery}
            />
            <LocationsButtons
              locationType="Cidade"
              onClickEdit={console.log}
              onClickDelete={toggleDeleteModal}
            />
          </div>

          {filteredNeighborhoods.map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
          ))}
        </div>
      )}
    </>
  )
}

export default CityCard