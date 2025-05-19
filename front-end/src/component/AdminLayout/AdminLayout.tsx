import { Box } from "@mui/material";
import Header from "../Header/header";
import { Sidebar } from "../Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </>
  );
};

export default AdminLayout;
