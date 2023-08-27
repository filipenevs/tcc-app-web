
import React, { useState } from 'react'
import { NeighborhoodFormProps } from './interface'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

import { useAppDispatch } from '../../hooks/redux'
import { toast } from 'react-toastify'
import { createNeighborhood, updateNeighborhood } from '../../store/reducers/locations'
import NeighborhoodService from '../../api/services/neighborhood'

const NeighborhoodForm: React.FC<NeighborhoodFormProps> = ({ city, neighborhood, closeFunction, stateId }) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState(neighborhood?.name ?? '')
  const [loading, setLoading] = useState(false)

  function handleOnClickConfirmButton() {
    setLoading(true)

    if (neighborhood) {
      NeighborhoodService.update({ ...neighborhood, name }).then((res) => {
        dispatch(updateNeighborhood({ neighborhood: res, stateId: stateId ?? '' }))
        toast.success('Bairro alterado com sucesso!')
      })
        .catch(({ message }) => {
          toast.error(message)
        })
        .finally(() => {
          closeFunction(false)
        })
    } if (city) {
      NeighborhoodService.add(name, city.id).then((res) => {
        dispatch(createNeighborhood({ neighborhood: res, stateId: city.stateId }))
        toast.success('Bairro adicionado com sucesso!')
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
        <span className="text-xl font-bold">{neighborhood ? 'Alterar' : 'Adicionar'} Bairro</span>
        <span>{
          city ? `Cidade: ${city.name}` : `Bairro: ${neighborhood?.name}`
        }</span>
        <div className='flex flex-col gap-2'>
          <span className='font-bold'>Nome</span>
          <input type="text" autoFocus className='p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600' value={name} onChange={handleOnChangeName} />
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
    </ModalWrapper>)
}

export default NeighborhoodForm