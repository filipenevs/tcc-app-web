import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toogleSideBarExpand } from '../../store/reducers/app'

const SideBarExpand = () => {
  const dispatch = useAppDispatch()
  const { sideBarExpanded } = useAppSelector(({ app }) => app)

  function handleOnClickExpandButton() {
    dispatch(toogleSideBarExpand())
  }

  return (
    <button
      className="ml-auto inline-flex p-4 bg-slate-200 rounded-2xl text-2xl hover:bg-slate-300"
      onClick={handleOnClickExpandButton}
    >
      {sideBarExpanded ? <FaAngleLeft /> : <FaAngleRight />}
    </button>
  )
}

export default SideBarExpand
