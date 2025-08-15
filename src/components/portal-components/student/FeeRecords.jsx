import React from 'react'

const FeeRecords = () => {
  console.log("Fee Records Component Loaded");
  return (
   <div className="bg-white rounded-lg shadow-sm border p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Fee Records</h2>
    <p className="text-gray-600">Your fee payment history and pending dues will be shown here.</p>
  </div>
  )
}

export default FeeRecords
