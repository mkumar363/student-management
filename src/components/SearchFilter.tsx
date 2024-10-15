import React from 'react'

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  enrollmentFilter: string;
  setEnrollmentFilter: (filter: string) => void;
}

export default function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  enrollmentFilter, 
  setEnrollmentFilter 
}: SearchFilterProps) {
  return (
    <div className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="w-full">
        <select
          value={enrollmentFilter}
          onChange={(e) => setEnrollmentFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  )
}
