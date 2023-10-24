import { CircularProgress } from '@mui/material'
import React from 'react'

function LoadingBox () {
  return (
    <div>
    <CircularProgress sx={{ mt: '20%', mb: '8%' }}
/> 
    <span className="visually-hidden" >Loading...</span>
    </div> )
}

export default LoadingBox 

