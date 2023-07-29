import React from 'react'

export interface LocationsFilterProps {
  locationType: 'Cidades' | ' Bairros'
  onChangeFilter: React.Dispatch<React.SetStateAction<string>>
}
