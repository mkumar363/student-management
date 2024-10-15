import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import { Student } from '../App'

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.enrollmentStatus ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(student)} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button onClick={() => onDelete(student.id)} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}