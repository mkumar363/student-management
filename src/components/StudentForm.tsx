import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
} from '@mui/material'
import { Student } from '../App'

interface StudentFormProps {
  onSubmit: (student: Omit<Student, 'id'>) => void
  editingStudent: Student | null
  setEditingStudent: (student: Student | null) => void
}

export default function StudentForm({ onSubmit, editingStudent, setEditingStudent }: StudentFormProps) {
  const [student, setStudent] = useState<Omit<Student, 'id'>>({
    name: '',
    age: 0,
    grade: 'A',
    enrollmentStatus: true,
  })
  const [formErrors, setFormErrors] = useState<{
    name?: string
    age?: string
  }>({})

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent)
    }
  }, [editingStudent])

  const validateForm = () => {
    const errors: { name?: string; age?: string } = {}

    if (!student.name.trim()) {
      errors.name = 'Name is required'
    }

    if (isNaN(student.age) || student.age <= 0) {
      errors.age = 'Age must be a positive number'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(student)
      setStudent({ name: '', age: 0, grade: 'A', enrollmentStatus: true })
      setEditingStudent(null)
    }
  }

  return (
    <Box component="form" sx={{ mb: 2 }}>
      <TextField
        label="Name"
        type="text"
        value={student.name}
        onChange={(e) => {
          setStudent({ ...student, name: e.target.value })
          setFormErrors({ ...formErrors, name: undefined })
        }}
        fullWidth
        margin="normal"
        error={!!formErrors.name}
        helperText={formErrors.name}
        required
      />
      <TextField
        label="Age"
        type="number"
        value={student.age}
        onChange={(e) => {
          setStudent({ ...student, age: parseInt(e.target.value) || 0 })
          setFormErrors({ ...formErrors, age: undefined })
        }}
        fullWidth
        margin="normal"
        error={!!formErrors.age}
        helperText={formErrors.age}
        required
      />
      <FormControl fullWidth margin="normal">
        <Select
          value={student.grade}
          onChange={(e) => setStudent({ ...student, grade: e.target.value as Student['grade'] })}
          required
        >
          {['A', 'B', 'C', 'D', 'F'].map((grade) => (
            <MenuItem key={grade} value={grade}>
              {grade}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={student.enrollmentStatus}
            onChange={(e) => setStudent({ ...student, enrollmentStatus: e.target.checked })}
          />
        }
        label="Active Enrollment"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={!student.name.trim() || student.age <= 0}
      >
        {editingStudent ? 'Update Student' : 'Add Student'}
      </Button>
      {editingStudent && (
        <Button
          variant="outlined"
          onClick={() => {
            setEditingStudent(null)
            setStudent({ name: '', age: 0, grade: 'A', enrollmentStatus: true })
          }}
          sx={{ mt: 2, ml: 2 }}
        >
          Cancel Edit
        </Button>
      )}
    </Box>
  )
}
