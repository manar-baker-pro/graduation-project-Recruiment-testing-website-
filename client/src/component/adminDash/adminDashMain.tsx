import React from 'react'
import TEMPDROWER from './components/tempDrower'
import { Outlet } from 'react-router-dom'
export default function ADMINDASHMAIN() {
  return (
    <div>
      <TEMPDROWER/>
      <Outlet />
    </div>
  )
}
