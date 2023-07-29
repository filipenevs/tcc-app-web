import { useAppSelector } from '../../hooks/redux'
import StateCard from '../StateCard/StateCard'

const LocationsList = () => {
  const { data } = useAppSelector(({ locations }) => locations)

  return (
    <div className="h-full w-full flex">
      <div className="p-5 bg-slate-200 grow rounded-2xl flex flex-col gap-2">
        {data?.map((state) => <StateCard key={state.id} state={state} />)}
      </div>
    </div>
  )
}

export default LocationsList
