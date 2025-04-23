import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useAuth } from "@/context/authcontext"; // import context

export default function IconLabelButtons() {
  const { logout } = useAuth(); // lấy hàm login từ context

  const handleLogout = () => {
    logout();
    alert("Đăng xuất thành công");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleLogout}
      >
        Đặng Xuất
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
  );
}
