import React from 'react'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
;
const TestCaseResult = (index, type) => {
  return (
    <div className='bg-white shadow-md flex justify-between items-center'>
        <h1>Test case {index}: {type}</h1>
        {type === 'pass' ? <CheckOutlinedIcon /> : <ClearOutlinedIcon />}
    </div>
  )
}

export default TestCaseResult