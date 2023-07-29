import React from 'react'

import { LocationsFilterProps } from './interface'

const LocationsFilter: React.FC<LocationsFilterProps> = ({
  locationType,
  onChangeFilter,
}) => {
  function handleOnChangeField({ target }: React.ChangeEvent<HTMLInputElement>) {
    onChangeFilter(target.value.trim().toLowerCase())
  }

  return (
    <input
      type="text"
      placeholder={`Filtrar ${locationType}`}
      className="p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      onChange={handleOnChangeField}
    />
  )
}

export default LocationsFilter
