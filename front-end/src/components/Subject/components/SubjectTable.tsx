import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ISubject } from "@/utils/subject";
import { useState } from "react";

interface Props {
  data: ISubject[];
  onEdit: (subject: ISubject) => void;
  onDelete: (subject: ISubject) => void;
}

// Common cell styling for consistent borders
const cellStyle = { border: "1px solid #ddd" };

// Functional component to display subject data in a paginated table
export const SubjectTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows-per-page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Slice data based on pagination settings and data examples
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ borderRadius: 2, boxShadow: 2 }}>
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle} width={30}>
                STT
              </TableCell>
              <TableCell sx={cellStyle}>Mã Lớp Học</TableCell>
              <TableCell sx={cellStyle}>Tên Lớp</TableCell>
              <TableCell sx={cellStyle}>Chuyên Ngành</TableCell>
              <TableCell sx={cellStyle} width={150}>
                Số Buổi
              </TableCell>
              <TableCell sx={cellStyle} width={150}>
                Số Slot Mỗi Tuần
              </TableCell>
              <TableCell sx={cellStyle} width={120} align="center"></TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData.map((subject, index) => (
              <TableRow key={subject.id}>
                <TableCell sx={cellStyle}>
                  {index + page * rowsPerPage + 1}
                </TableCell>
                <TableCell sx={cellStyle}>{subject.subjectCode}</TableCell>
                <TableCell sx={cellStyle}>{subject.subjectName}</TableCell>
                <TableCell sx={cellStyle}>{subject.major}</TableCell>
                <TableCell sx={cellStyle}>{subject.totalSessions}</TableCell>
                <TableCell sx={cellStyle}>{subject.slotsPerWeek}</TableCell>
                <TableCell sx={cellStyle} align="center">
                  {/* Edit button */}
                  <IconButton onClick={() => onEdit(subject)} color="primary">
                    <EditIcon />
                  </IconButton>
                  {/* Delete button */}
                  <IconButton onClick={() => onDelete(subject)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100]}
        labelRowsPerPage=""
      />
    </Paper>
  );
};
