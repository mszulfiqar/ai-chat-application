import React from 'react'
import { ClipLoader } from 'react-spinners'

type LoadingProp = {
  title?: string;
};

const LoadingComponet = ({ title }: LoadingProp) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-8  text-center gap-2 flex justify-between items-center">
        <ClipLoader />
        <p className="text-lg font-medium">{title}</p>
      </div>
    </div>
  )
}

export default LoadingComponet