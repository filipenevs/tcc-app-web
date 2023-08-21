import React from 'react'

import { LocationsButtonsProps } from './interface'

const LocationsButtons: React.FC<LocationsButtonsProps> = ({
  locationType,
  isEditing,
  onClickEdit,
  onClickDelete,
  onClickSave,
  onClickCancel,
}) => {
  return (
    <div className="flex justify-end gap-2">
      {isEditing ? (
        <>
          <button
            className="rounded-md bg-red-500 hover:bg-red-600 py-2 px-5 font-medium text-white"
            onClick={onClickCancel}
          >
            Cancelar edição
          </button>
          <button
            className="rounded-md bg-green-500 hover:bg-green-600 py-2 px-5 font-medium text-white"
            onClick={onClickSave}
          >
            Salvar edição
          </button>
        </>
      ) : (
        <>
          <button
            className="rounded-md bg-blue-500 hover:bg-blue-600 py-2 px-5 font-medium text-white"
            onClick={onClickEdit}
          >
            Editar {locationType}
          </button>
          <button
            className="rounded-md bg-red-500 hover:bg-red-600 py-2 px-5 font-medium text-white"
            onClick={onClickDelete}
          >
            Excluir {locationType}
          </button>
        </>
      )}
    </div>
  )
}

export default LocationsButtons
