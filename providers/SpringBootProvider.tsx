"use client"

import React from 'react'

interface Props {
  children: React.ReactNode;
}

const SpringBootProvider: React.FC<Props> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default SpringBootProvider