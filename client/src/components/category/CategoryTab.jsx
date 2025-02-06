import React from 'react'

const CategoryTab = () => {
  return (
   <>
    <div className='mt-1 flex gap-2'>

    <button type='button' className='bg-slate-200 px-3 py-1 rounded-full hover:bg-slate-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white'>All</button>
    <button type='button' className='bg-slate-200 px-3 py-1 rounded-full  hover:bg-slate-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white'>Unread</button>
    <button type='button' className='bg-slate-200 px-3 py-1 rounded-full hover:bg-slate-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white'>Favorites</button>
    <button type='button' className='bg-slate-200 px-3 py-1 rounded-full hover:bg-slate-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white'>Groups</button>
    </div>
   
   </>

  )
}

export default CategoryTab