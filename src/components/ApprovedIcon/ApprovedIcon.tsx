import React from 'react'
import { ApprovedIconProps } from './interface'
import { Status } from '../../typings/user'

const displayValues: Record<Status, string> = {
  approved: 'Aprovado',
  pending: 'Pendente',
  rejected: 'Recusado',
}

const displayColors: Record<Status, string> = {
  approved: 'green',
  pending: 'yellow',
  rejected: 'red',
}

const ApprovedIcon: React.FC<ApprovedIconProps> = ({ status }) => {
  const color = displayColors[status]

  return (
    <div className="w-full flex justify-center">
      <span
        className={`px-2  bg-${color}-100 border-${color}-300 text-${color}-500 border-2 rounded-md font-medium`}
      >
        {displayValues[status]}
      </span>
    </div>
  )
}

export default ApprovedIcon
