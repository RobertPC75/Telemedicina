import React from 'react'
import { FileText, Download } from 'lucide-react'

const MedicalRecordsPage: React.FC = () => {
  const records = [
    { id: 1, date: '2024-03-15', type: 'Lab Results', doctor: 'Dr. Smith' },
    { id: 2, date: '2024-02-28', type: 'Prescription', doctor: 'Dr. Johnson' },
    { id: 3, date: '2024-01-10', type: 'X-Ray Report', doctor: 'Dr. Williams' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileText className="mr-2" /> Medical Records
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-green-600 hover:text-green-900 flex items-center">
                    <Download size={18} className="mr-1" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Upload New Record</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Select File
            </label>
            <input type="file" id="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Upload Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MedicalRecordsPage