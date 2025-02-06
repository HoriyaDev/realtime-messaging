import React from 'react'
import { people } from '../../utils/constant'

const AllChat = () => {
  return (
    <div className="h-[500px] overflow-y-auto scrollbar-custom  p-2"> 
      {people.map((items) => (
        <div key={items.id} className='flex gap-4 mt-3 p-2 border-b'>
          <img 
            src={items.imgSrc} 
            alt={`${items.name}'s profile`} 
            className='w-14 h-14 rounded-full object-cover' 
          />
          <div>
            <p className="font-semibold dark:text-white">{items.name}</p>
            <p className="text-gray-500 dark:text-white text-sm">{items.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllChat
