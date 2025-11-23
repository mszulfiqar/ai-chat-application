import Link from 'next/link'
import React from 'react'

const ErrorInavlidToken = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-[#fcfcfc] border shadow-xl  px-8 py-6 rounded-xl w-[500px] '>
        <div className='flex items-center justify-center mb-3'>
        <div className="text-red-500  text-xl text-center">⚠️</div>
        <h1 className='font-semibold text-2xl '>Invalid Token</h1>
        </div>
        <p className='text-[16px] my-6 text-center'>The password reset link is either expired or invalid. <br /> Please request a new one.</p>
        <Link
          href="/reseting-email"
          className="inline-block w-full text-center bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Request New Link
        </Link>
      </div>
    </div>
  )
}

export default ErrorInavlidToken