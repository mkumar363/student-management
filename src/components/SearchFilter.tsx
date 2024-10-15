import React from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'

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
    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <TextField
        label="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Enrollment Status</InputLabel>
        <Select
          value={enrollmentFilter}
          onChange={(e) => setEnrollmentFilter(e.target.value)}
          label="Enrollment Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}