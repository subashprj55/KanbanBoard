import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
  }
const Button = ({children}:Props) => {
  return (
    <p className='px-5 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700'>
      {children}
    </p>
  )
}

export default Button
