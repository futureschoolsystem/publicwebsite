'use client'
import { signOut } from 'next-auth/react'

const SignoutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: '/login' })} className='block bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition font-semibold'>
      Sign Out
    </button>
  )
}

export default SignoutButton
