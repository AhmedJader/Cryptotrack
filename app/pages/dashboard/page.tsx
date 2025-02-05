import React from 'react'
import { UserButton } from '@clerk/nextjs'
import User from '../../comp/userhandle'

const UserId = () => {
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='fixed top-5 right-5'>
          <UserButton />
        </div>

        <User />
      </div>
    </main>
  )
}

export default UserId