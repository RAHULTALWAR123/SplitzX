import React from 'react'
import { NavbarDemo } from '../nav'
import CountUp from './_components/CountUp'

function page() {
  return (
    <>
        <NavbarDemo/>
        <div className='flex justify-center mt-20'>
            <CountUp
  from={0}
  to={212.56}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>
        </div>  
    </>
  )
}

export default page
