
import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import SearchFilter from './components/SearchFilter'

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  enrollmentStatus: boolean;
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([])
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [enrollmentFilter, setEnrollmentFilter] = useState('all')

  useEffect(() => {
    const storedStudents = localStorage.getItem('students')
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const addOrUpdateStudent = (student: Omit<Student, 'id'>) => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id ? { ...student, id: s.id } : s
      ))
      setEditingStudent(null)
    } else {
      setStudents([...students, { ...student, id: Date.now() }])
    }
  }

  const deleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id))
  }

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (enrollmentFilter === 'all' || 
     (enrollmentFilter === 'active' && student.enrollmentStatus) ||
     (enrollmentFilter === 'inactive' && !student.enrollmentStatus))
  )

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Record Management System
      </Typography>
      
      <StudentForm 
        onSubmit={addOrUpdateStudent} 
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        enrollmentFilter={enrollmentFilter}
        setEnrollmentFilter={setEnrollmentFilter}
      />

      <StudentTable
        students={filteredStudents}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />
    </Box>
  )
}