import React, { useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import NeighborhoodCard from '../NeighborhoodCard/NeighborhoodsCard'
import LocationsFilter from '../LocationsFilter/LocationsFilter'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { removeCity, selectCity } from '../../store/reducers/locations'

import { CityCardProps } from './interface'

import CityService from '../../api/services/city'
import { normalize } from '../../utils/string'
import CityForm from '../CityForm/CityForm'
import NeighborhoodForm from '../NeighborhoodForm/NeighborhoodForm'

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const dispatch = useAppDispatch()
  const { city: selectedCity } = useAppSelector(({ locations }) => locations.selection)

  const { id, name, neighborhoods, stateId } = city

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [neighborhoodQuery, setNeighborhoodQuery] = useState('')
  const [isAddCityOpen, setIsAddCityOpen] = useState(false)
  const [isAddNeighborhoodOpen, setIsAddNeighborhoodOpen] = useState(false)

  const isSelectedCity = selectedCity === id
  const hasNeighborhood = neighborhoods.length > 0

  const filteredNeighborhoods = neighborhoods.filter(({ name }) =>
    normalize(name).includes(neighborhoodQuery),
  )

  function handleOnCityClick() {
    dispatch(selectCity(isSelectedCity ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
  }

  function toggleAddCityModal() {
    setIsAddCityOpen((prevValue) => !prevValue)
  }

  function toggleAddNeighborhoodModal() {
    setIsAddNeighborhoodOpen((prevValue) => !prevValue)
  }

  function handleOnConfirmDelete() {
    CityService.delete(id)
      .then(() => {
        dispatch(removeCity({ stateId, cityId: id }))
        toast.success('Cidade excluída com sucesso!')
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
          content="Deseja realmente excluir a cidade selecionada?"
          confirmButtonAction={handleOnConfirmDelete}
          cancelButtonAction={toggleDeleteModal}
        />
      )}
      {isAddCityOpen && <CityForm city={city} closeFunction={toggleAddCityModal} />}
      {isAddNeighborhoodOpen && (
        <NeighborhoodForm city={city} closeFunction={toggleAddNeighborhoodModal} />
      )}
      <button
        className={classNames(
          'p-4 rounded-xl border-4 border-slate-300 hover:bg-slate-300 cursor-pointer text-left flex justify-between',
          { 'bg-slate-300': isSelectedCity },
        )}
        onClick={handleOnCityClick}
      >
        <span className="font-bold">{name}</span>
        <span>
          {hasNeighborhood
            ? `${neighborhoods.length} bairro${neighborhoods.length > 1 ? 's' : ''}`
            : 'Sem Bairros'}
        </span>
      </button>
      {isSelectedCity && (
        <div className="flex flex-col ml-10 gap-2">
          <div className="flex justify-between">
            <LocationsFilter
              locationType=" Bairros"
              onChangeFilter={setNeighborhoodQuery}
            />
            <div className="flex gap-2">
              <button
                className="rounded-md bg-green-500 hover:bg-green-600 py-2 px-5 font-medium text-white"
                onClick={toggleAddNeighborhoodModal}
              >
                Adicionar Bairro
              </button>
              <button
                className="rounded-md bg-blue-500 hover:bg-blue-600 py-2 px-5 font-medium text-white"
                onClick={toggleAddCityModal}
              >
                Editar Cidade
              </button>
              <button
                className="rounded-md bg-red-500 hover:bg-red-600 py-2 px-5 font-medium text-white"
                onClick={toggleDeleteModal}
              >
                Excluir Cidade
              </button>
            </div>
          </div>

          {filteredNeighborhoods.map((neighborhood) => (
            <NeighborhoodCard
              key={neighborhood.id}
              neighborhood={neighborhood}
              stateId={stateId}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default CityCard
