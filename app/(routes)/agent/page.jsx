import React from 'react'
import AIAgent from '@/components/custom/AIAgent'
import Sidebar from '@/app/_components/Sidebar'

const AiAgentPage = () => {
  return (
    <>
        <div className='-mt-3'>
          <Sidebar/>
        </div>
        <div className='lg:ml-80 lg:mr-20 sm:mr-10'>
            <AIAgent />
        </div>
    </>
  )
}

export default AiAgentPage