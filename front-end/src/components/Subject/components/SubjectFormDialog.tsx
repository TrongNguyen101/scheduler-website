import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { ISubject } from "@/utils/subject";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ISubject) => void;
  subject: ISubject;
  isEdit?: boolean;
}

// Functional component for adding/editing a subject
export const SubjectFormDialog: FC<Props> = ({
  open,
  onClose,
  onSave,
  subject,
  isEdit = false,
}) => {
  // Local state for the form data
  const [form, setForm] = useState(subject);

  // Whenever the subject prop changes update the form state
  useEffect(() => {
    setForm(subject);
  }, [subject]);

  // Handle changes in form fields
  const handleChange = (field: keyof ISubject, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Dialog title based on add or edit mode */}
      <DialogTitle>{isEdit ? "Cập nhật" : "Thêm mới"} môn học</DialogTitle>

      {/* Form content */}
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Mã Lớp Học"
            value={form.subjectCode}
            onChange={(e) => handleChange("subjectCode", e.target.value)}
            fullWidth
            disabled={isEdit}
          />
          <TextField
            label="Tên Lớp"
            value={form.subjectName}
            onChange={(e) => handleChange("subjectName", e.target.value)}
            fullWidth
          />
          <TextField
            label="Chuyên Ngành"
            value={form.major}
            onChange={(e) => handleChange("major", e.target.value)}
            fullWidth
          />
          <TextField
            label="Số Buổi"
            type="number"
            value={form.totalSessions}
            onChange={(e) => handleChange("totalSessions", +e.target.value)}
            fullWidth
          />
          <TextField
            label="Số Slot Mỗi Tuần"
            type="number"
            value={form.slotsPerWeek}
            onChange={(e) => handleChange("slotsPerWeek", +e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      {/* Action buttons */}
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ backgroundColor: "#95a5a6", color: "white" }}
          variant="contained"
        >
          Hủy
        </Button>
        <Button
          onClick={() => onSave(form)}
          variant="contained"
          sx={{ backgroundColor: "#34A853", color: "white" }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
