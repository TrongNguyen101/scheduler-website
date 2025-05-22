import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  GetAppOutlined,
  PublishOutlined,
  AddOutlined,
} from "@mui/icons-material";
import { ISubject } from "@/utils/subject";
import { SubjectTable } from "./SubjectTable";
import { SubjectFormDialog } from "./SubjectFormDialog";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

const initialData: ISubject[] = [
  {
    id: "1",
    subjectCode: "MH001",
    subjectName: "Lập Trình C#",
    major: "Công Nghệ Thông Tin",
    totalSessions: 30,
    slotsPerWeek: 3,
  },
  {
    id: "2",
    subjectCode: "MH002",
    subjectName: "Cơ Sở Dữ Liệu",
    major: "Hệ Thống Thông Tin",
    totalSessions: 25,
    slotsPerWeek: 2,
  },
  {
    id: "3",
    subjectCode: "MH003",
    subjectName: "Mạng Máy Tính",
    major: "Kỹ Thuật Mạng",
    totalSessions: 28,
    slotsPerWeek: 3,
  },
  {
    id: "4",
    subjectCode: "MH004",
    subjectName: "Thiết Kế Web",
    major: "Công Nghệ Phần Mềm",
    totalSessions: 32,
    slotsPerWeek: 4,
  },
  {
    id: "5",
    subjectCode: "MH005",
    subjectName: "Trí Tuệ Nhân Tạo",
    major: "Khoa Học Máy Tính",
    totalSessions: 36,
    slotsPerWeek: 3,
  },
];

// Main component for the subject management page
export default function Subject() {
  const [subjects, setSubjects] = useState<ISubject[]>(initialData); // State for subject list
  const [formOpen, setFormOpen] = useState(false); // State to control open/close of form dialog
  const [selected, setSelected] = useState<ISubject | null>(null); // State to store the subject being edited or deleted
  const [deleteDialog, setDeleteDialog] = useState(false); // State to control open/close of delete confirmation dialog

  // Handle save (add or update)
  const handleSave = (data: ISubject) => {
    if (selected) {
      // If editing, update the subject
      setSubjects((prev) => prev.map((s) => (s.id === data.id ? data : s)));
    } else {
      // If adding new, create a new
      setSubjects((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    }
    setFormOpen(false);
    setSelected(null);
  };

  // Handle confirm delete
  const handleDelete = () => {
    if (selected) {
      setSubjects((prev) => prev.filter((s) => s.id !== selected.id));
      setDeleteDialog(false);
      setSelected(null);
    }
  };

  return (
    <Box p={4}>
      {/* Page title */}
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Quản Lý Môn Học
      </Typography>

      {/* Toolbar: search, export, import, and add subject */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          placeholder="Tìm kiếm..."
          sx={{ height: "40px", "& .MuiInputBase-root": { height: "100%" } }}
        />
        <Button
          variant="contained"
          sx={{ height: "40px", backgroundColor: "#FF9800" }}
        >
          <PublishOutlined /> Export
        </Button>
        <Button
          variant="contained"
          sx={{ height: "40px", backgroundColor: "#4285F4" }}
        >
          <GetAppOutlined /> Import
        </Button>
        <Button
          variant="contained"
          sx={{ height: "40px", backgroundColor: "#34A853" }}
          onClick={() => setFormOpen(true)}
        >
          <AddOutlined /> Thêm Môn Học
        </Button>
      </Stack>

      {/* Subject table component */}
      <SubjectTable
        data={subjects}
        onEdit={(s) => {
          setSelected(s);
          setFormOpen(true);
        }}
        onDelete={(s) => {
          setSelected(s);
          setDeleteDialog(true);
        }}
      />

      {/* Form dialog to add/edit subject */}
      <SubjectFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelected(null);
        }}
        onSave={handleSave}
        subject={
          selected || {
            id: "",
            subjectCode: "",
            subjectName: "",
            major: "",
            totalSessions: 0,
            slotsPerWeek: 0,
          }
        }
        isEdit={!!selected}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
