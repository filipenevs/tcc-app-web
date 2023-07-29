import PageTitle from '../../components/PageTitle/PageTitle'
import LocationsList from '../../components/LocationsList/LocationsList'

const Locations = () => {
  return (
    <>
      <div className="flex justify-between">
        <PageTitle text="Localidades" />
      </div>
      <LocationsList />
    </>
  )
}

export default Locations
