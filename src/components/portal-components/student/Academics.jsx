import React from 'react'
import { useSession } from 'next-auth/react'
const Academics = () => {
  const {data:session,status} = useSession();

  const fetchResult = () => {
    
  }
  return (
   <div className="bg-white rounded-lg shadow-sm border p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Records</h2>
     {/* Test Type Selection */}
        <div className="space-y-2">
          <label htmlFor="testType" className="block text-sm font-semibold text-gray-700">
            <i className="fas fa-clipboard-check mr-2 text-orange-600"></i>Test Type
          </label>
          <select onChange={fetchResult()} id="testType" name="testType" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required>
            <option value="" disabled selected>Select Test Type</option>
            <option value="First Assessment">1st Assessment</option>
            <option value="Second Assessment">2nd Assessment</option>
            <option value="Third Assessment">3rd Assessment</option>
            <option value="Fourth Assessment">4th Assessment</option>
            <option value="Fifth Assessment">5th Assessment</option>
            <option value="First Term">1st Term</option>
            <option value="Second Term">2nd Term</option>
          </select>
        </div>
  </div>
  )
}

export default Academics
