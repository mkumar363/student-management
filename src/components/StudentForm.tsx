import React, { useState, useEffect } from 'react'
import { Student } from '../App'

interface StudentFormProps {
  onSubmit: (student: Omit<Student, 'id'>) => void
  editingStudent: Student | null
  setEditingStudent: (student: Student | null) => void
}

export default function StudentForm({
  onSubmit,
  editingStudent,
  setEditingStudent,
}: StudentFormProps) {
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
    <form className="mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={student.name}
          onChange={(e) => {
            setStudent({ ...student, name: e.target.value })
            setFormErrors({ ...formErrors, name: undefined })
          }}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formErrors.name ? 'border-red-500' : ''
          }`}
          placeholder="Enter name"
          required
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
          Age
        </label>
        <input
          id="age"
          type="number"
          value={student.age}
          onChange={(e) => {
            setStudent({ ...student, age: parseInt(e.target.value) || 0 })
            setFormErrors({ ...formErrors, age: undefined })
          }}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formErrors.age ? 'border-red-500' : ''
          }`}
          placeholder="Enter age"
          required
        />
        {formErrors.age && (
          <p className="text-red-500 text-xs italic mt-1">{formErrors.age}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="grade">
          Grade
        </label>
        <select
          id="grade"
          value={student.grade}
          onChange={(e) =>
            setStudent({ ...student, grade: e.target.value as Student['grade'] })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          {['A', 'B', 'C', 'D', 'F'].map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={student.enrollmentStatus}
            onChange={(e) =>
              setStudent({ ...student, enrollmentStatus: e.target.checked })
            }
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">Active Enrollment</span>
        </label>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={!student.name.trim() || student.age <= 0}
        >
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
        {editingStudent && (
          <button
            type="button"
            onClick={() => {
              setEditingStudent(null)
              setStudent({ name: '', age: 0, grade: 'A', enrollmentStatus: true })
            }}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  )
}
