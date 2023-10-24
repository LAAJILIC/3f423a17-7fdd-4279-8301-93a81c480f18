import React from 'react'
import Alert from '@mui/material/Alert'


export default function MessageBox({
  children,
}: {
  children: React.ReactNode
}) {

  return <Alert variant="outlined" severity="warning">
  {children}</Alert>
}