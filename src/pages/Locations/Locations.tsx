import { useState } from 'react'

import PageTitle from '../../components/PageTitle/PageTitle'
import LocationsList from '../../components/LocationsList/LocationsList'
import StateForm from '../../components/StateForm/StateForm'

const Locations = () => {
  const [isAddStateOpen, setIsAddStateOpen] = useState(false)

  function handleOnClickAddState() {
    setIsAddStateOpen(true)
  }

  return (
    <>
      {isAddStateOpen && (
        <StateForm
          isEdit={false}
          closeFunction={() => setIsAddStateOpen(false)}
        />
      )}
      <div className="flex justify-between">
        <PageTitle text="Localidades" />
        <div className="flex gap-2">
          <button
            className="rounded-md bg-slate-500 hover:bg-slate-600 py-2 px-5 font-medium text-white"
            onClick={handleOnClickAddState}
          >
            Adicionar Estado
          </button>
        </div>
      </div>
      <LocationsList />
    </>
  )
}

export default Locations
