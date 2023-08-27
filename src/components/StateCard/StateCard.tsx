import React, { useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import LocationsFilter from '../LocationsFilter/LocationsFilter'
import CityCard from '../CityCard/CityCard'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { removeState, selectState } from '../../store/reducers/locations'

import { StateCardProps } from './interface'

import StateService from '../../api/services/state'
import { normalize } from '../../utils/string'
import CityForm from '../CityForm/CityForm'

const StateCard: React.FC<StateCardProps> = ({ state }) => {
  const dispatch = useAppDispatch()
  const { state: selectedState } = useAppSelector(({ locations }) => locations.selection)

  const { id, uf, name, cities } = state

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddCityOpen, setIsAddCityOpen] = useState(false)
  const [cityQuery, setCityQuery] = useState('')

  const isSelectedState = selectedState === id
  const hasCity = cities.length > 0

  const filteredCities = cities.filter(({ name }) => normalize(name).includes(cityQuery))

  function handleOnStateClick() {
    dispatch(selectState(isSelectedState ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
  }

  function toggleAddCityModal() {
    setIsAddCityOpen((prevValue) => !prevValue)
  }

  function handleOnConfirmDelete() {
    StateService.delete(id)
      .then(() => {
        dispatch(removeState(id))
        toast.success('Estado excluído com sucesso!')
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
          content="Deseja realmente excluir o estado selecionado?"
          confirmButtonAction={handleOnConfirmDelete}
          cancelButtonAction={toggleDeleteModal}
        />
      )}
      {isAddCityOpen && (
        <CityForm
          state={state}
          closeFunction={toggleAddCityModal}
        />
      )}
      <div className="flex flex-col gap-2">
        <button
          className={classNames(
            'p-4 rounded-xl border-4 border-slate-300 hover:bg-slate-300 cursor-pointer flex justify-between',
            { 'bg-slate-300': isSelectedState },
          )}
          onClick={handleOnStateClick}
        >
          <span className='font-bold'>
            {name} - {uf}
          </span>
          <span>
            {hasCity ? `${cities.length} cidade${cities.length > 1 ? 's' : ''}` : 'Sem cidades'}
          </span>
        </button>

        {isSelectedState && (
          <div className="flex flex-col ml-10 gap-2">
            <div className="flex justify-between">
              <LocationsFilter locationType="Cidades" onChangeFilter={setCityQuery} />
              <div className='flex gap-2'>
                <button
                  className="rounded-md bg-green-500 hover:bg-green-600 py-2 px-5 font-medium text-white"
                  onClick={toggleAddCityModal}
                >
                  Adicionar Cidade
                </button>
                <button
                  className="rounded-md bg-red-500 hover:bg-red-600 py-2 px-5 font-medium text-white"
                  onClick={toggleDeleteModal}
                >
                  Excluir Estado
                </button>
              </div>
            </div>
            {filteredCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default StateCard
