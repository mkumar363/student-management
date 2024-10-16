import React, { useState, useEffect } from 'react'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import SearchFilter from './components/SearchFilter'

export interface Student {
  id: number
  name: string
  age: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  enrollmentStatus: boolean
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
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...student, id: s.id } : s
        )
      )
      setEditingStudent(null)
    } else {
      setStudents([...students, { ...student, id: Date.now() }])
    }
  }

  const deleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (enrollmentFilter === 'all' ||
        (enrollmentFilter === 'active' && student.enrollmentStatus) ||
        (enrollmentFilter === 'inactive' && !student.enrollmentStatus))
  )

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Record Management System</h1>

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
    </div>
  )
}
