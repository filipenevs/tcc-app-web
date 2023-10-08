import React from 'react'

import { UserProfileFormGroupProps } from './interface'

const UserProfileFormGroup: React.FC<UserProfileFormGroupProps> = ({
  name,
  label,
  value,
  children,
}) => {
  return (
    <div className="flex flex-col grow gap-1">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div>
        {value ? (
          <input
            value={value}
            type="text"
            name={name}
            id={name}
            readOnly
            disabled
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <div className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfileFormGroup
