import { Box } from "@mui/material";
import { Sidebar } from "../Sidebar";

// AdminLayout is main layout for admin  only include sidebar on the left and children
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </>
  );
};

export default AdminLayout;
