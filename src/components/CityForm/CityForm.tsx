import React, { useState } from 'react'
import { CityFormProps } from './interface'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

import { useAppDispatch } from '../../hooks/redux'
import { toast } from 'react-toastify'
import { createCity, updateCityData } from '../../store/reducers/locations'
import CityService from '../../api/services/city'

const CityForm: React.FC<CityFormProps> = ({ state, city, closeFunction }) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState(city?.name ?? '')
  const [loading, setLoading] = useState(false)

  function handleOnClickConfirmButton() {
    setLoading(true)

    if (city) {
      CityService.update({ ...city, name })
        .then((res) => {
          dispatch(updateCityData(res))
          toast.success('Cidade alterada com sucesso!')
        })
        .catch(({ message }) => {
          toast.error(message)
        })
        .finally(() => {
          closeFunction(false)
        })
    } else if (state) {
      CityService.add(name, state.id)
        .then((res) => {
          console.log({ res })
          dispatch(createCity(res))
          toast.success('Cidade adicionada com sucesso!')
        })
        .catch(({ message }) => {
          toast.error(message)
        })
        .finally(() => {
          closeFunction(false)
        })
    }
  }

  function handleOnClickCancelButton() {
    closeFunction()
  }

  function handleOnChangeName({ target }: React.ChangeEvent<HTMLInputElement>) {
    setName(target.value)
  }

  return (
    <ModalWrapper closeFunction={closeFunction}>
      <div className="flex flex-col gap-4">
        <span className="text-xl font-bold">{city ? 'Alterar' : 'Adicionar'} Cidade</span>
        <span>{city ? `Cidade: ${city.name}` : `Estado: ${state?.name}`}</span>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Nome</span>
          <input
            type="text"
            autoFocus
            className="p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            value={name}
            onChange={handleOnChangeName}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="rounded-md bg-red-500 text-white hover:bg-red-600 py-2 px-5 font-medium"
            onClick={handleOnClickCancelButton}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="rounded-md bg-green-500 text-white hover:bg-green-600 py-2 px-5 font-medium"
            onClick={handleOnClickConfirmButton}
            disabled={loading}
          >
            Confirmar
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CityForm
