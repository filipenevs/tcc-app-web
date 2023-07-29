import React, { useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import LocationsButtons from '../LocationsButtons/LocationsButtons'
import LocationsFilter from '../LocationsFilter/LocationsFilter'
import CityCard from '../CityCard/CityCard'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { selectState } from '../../store/reducers/locations'

import { StateCardProps } from './interface'

import StateService from '../../api/services/state'

const StateCard: React.FC<StateCardProps> = ({ state: { id, uf, name, cities } }) => {
  const dispatch = useAppDispatch()
  const { state: selectedState } = useAppSelector(({ locations }) => locations.selection)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [cityQuery, setCityQuery] = useState('')

  const isSelectedState = selectedState === id

  const filteredCities = cities.filter(({ name }) =>
    name.toLowerCase().includes(cityQuery),
  )

  function handleOnStateClick() {
    dispatch(selectState(isSelectedState ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
  }

  function handleOnConfirmDelete() {
    StateService.delete(id)
      .then(() => {
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
      <div className="flex flex-col gap-2">
        <button
          className={classNames(
            'p-4 rounded-xl font-bold border-4 border-slate-300 hover:bg-slate-300 cursor-pointer text-left',
            { 'bg-slate-300': isSelectedState },
          )}
          onClick={handleOnStateClick}
        >
          {name} - {uf}
        </button>

        {isSelectedState && (
          <div className="flex flex-col ml-10 gap-2">
            <div className="flex justify-between">
              <LocationsFilter locationType="Cidades" onChangeFilter={setCityQuery} />
              <LocationsButtons
                locationType="Estado"
                onClickEdit={console.log}
                onClickDelete={toggleDeleteModal}
              />
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
