import React from 'react'

import { LocationsFilterProps } from './interface'
import { normalize } from '../../utils/string'

const LocationsFilter: React.FC<LocationsFilterProps> = ({
  locationType,
  onChangeFilter,
}) => {
  function handleOnChangeField({ target }: React.ChangeEvent<HTMLInputElement>) {
    onChangeFilter(normalize(target.value))
  }

  return (
    <input
      type="text"
      placeholder={`Filtrar ${locationType}`}
      className="p-4 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
      onChange={handleOnChangeField}
    />
  )
}

export default LocationsFilter
