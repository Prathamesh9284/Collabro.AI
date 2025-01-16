import React from 'react'
import Sidebar from '@/app/_components/Sidebar'
import Games from '@/components/custom/Games'

const GamesPage = () => {
    return (
        <>
            <Sidebar />
            <div className='flex-1 lg:ml-80 lg:mr-20 md:ml-80 items-center justify-center md:pl-4'>
                <Games />
            </div>
        </>
    )
}

export default GamesPage