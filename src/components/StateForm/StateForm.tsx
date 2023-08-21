import React, { useState } from 'react'
import { StateFormProps } from './interface'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

import StateService from '../../api/services/state'
import { useAppDispatch } from '../../hooks/redux'
import { toast } from 'react-toastify'
import { createState } from '../../store/reducers/locations'

const StateForm: React.FC<StateFormProps> = ({ isEdit, state, closeFunction }) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState(state?.name ?? '')
  const [uf, setUf] = useState(state?.uf ?? '')
  const [loading, setLoading] = useState(false)

  function handleOnClickConfirmButton() {
    setLoading(true)

    if (isEdit && state) {
      StateService.update(state.id, name, uf).then(() => {
        // dispatch()
        toast.success('Estado alterado com sucesso!')
      })
        .catch(({ message }) => {
          toast.error(message)
        })
        .finally(() => {
          closeFunction(false)
        })
    } else {
      StateService.add(name, uf).then((res) => {
        dispatch(createState(res))
        toast.success('Estado adicionado com sucesso!')
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

  function handleOnChangeUf({ target }: React.ChangeEvent<HTMLInputElement>) {
    setUf(target.value)
  }

  return (
    <ModalWrapper closeFunction={closeFunction}>
      <div className="flex flex-col gap-5">
        <span className="text-xl font-bold">{isEdit ? 'Alterar' : 'Adicionar'} Estado</span>
        <div className='flex flex-col gap-2'>
          <span>Nome</span>
          <input type="text" autoFocus className='p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600' onChange={handleOnChangeName} />
        </div>

        <div className='flex flex-col gap-2'>
          <span>UF</span>
          <input type="text" className='p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 uppercase' maxLength={2} onChange={handleOnChangeUf} />
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

export default StateForm