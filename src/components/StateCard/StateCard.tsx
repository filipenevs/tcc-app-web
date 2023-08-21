import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import LocationsButtons from '../LocationsButtons/LocationsButtons'
import LocationsFilter from '../LocationsFilter/LocationsFilter'
import CityCard from '../CityCard/CityCard'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { removeState, selectState, updateStateData } from '../../store/reducers/locations'

import { StateCardProps } from './interface'

import StateService from '../../api/services/state'
import { normalize } from '../../utils/string'

const StateCard: React.FC<StateCardProps> = ({ state: { id, uf, name, cities } }) => {
  const dispatch = useAppDispatch()
  const { state: selectedState } = useAppSelector(({ locations }) => locations.selection)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [cityQuery, setCityQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(name)
  const [newUf, setNewUf] = useState(uf)

  const isSelectedState = selectedState === id

  const filteredCities = cities.filter(({ name }) => normalize(name).includes(cityQuery))

  function handleOnStateClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { target, currentTarget } = event
    if (!isEditing || target === currentTarget)
      dispatch(selectState(isSelectedState ? null : id))
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((prevValue) => !prevValue)
  }

  function handleOnClickEdit() {
    setNewName(name)
    setNewUf(uf)
    setIsEditing(true)
  }

  function handleOnCancelEdit() {
    setIsEditing(false)
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

  function handleOnConfirmEdition() {
    StateService.update(id, newName, newUf)
      .then(({ id, name, uf }) => {
        dispatch(updateStateData({ id, name, uf }))
        toast.success('Estado editado com sucesso!')
      })
      .catch(({ message }) => {
        toast.error(message)
      })
      .finally(() => {
        setIsEditing(false)
      })
  }

  function handleOnChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = event
    setNewName(value)
  }

  function handleOnChangeUf(event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = event
    setNewUf(value)
  }

  useEffect(() => {
    setIsEditing(false)
  }, [selectedState])

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
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nome"
                defaultValue={name}
                autoFocus
                className="px-1 rounded-md"
                onChange={handleOnChangeName}
                maxLength={19}
              />
              <input
                type="text"
                placeholder="UF"
                defaultValue={uf}
                className="w-24 px-1 rounded-md"
                onChange={handleOnChangeUf}
                maxLength={2}
              />
            </div>
          ) : (
            `${name} - ${uf}`
          )}
        </button>

        {isSelectedState && (
          <div className="flex flex-col ml-10 gap-2">
            <div className="flex justify-between">
              <LocationsFilter locationType="Cidades" onChangeFilter={setCityQuery} />
              <LocationsButtons
                locationType="Estado"
                onClickEdit={handleOnClickEdit}
                onClickDelete={toggleDeleteModal}
                onClickCancel={handleOnCancelEdit}
                onClickSave={handleOnConfirmEdition}
                isEditing={isEditing}
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
