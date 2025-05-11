import { useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Sidebar } from "../Sidebar";
import TimetableList from "../TimetableList/components/TimetableList";
import { eventData } from "@/utils/data";
import { Calendar } from "../Calendar";

// interface MainLayoutProps {
//   children: ReactNode;
// }

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            backgroundColor: "white",
            color: theme.palette.text.primary,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                color: theme.palette.primary.main,
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              TaskMaster
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Box sx={{ textAlign: "right", p: 1 }}>
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Sidebar />
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                position: "relative",
                height: "100%",
                border: "none",
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        )}
      </Box>

      {/* Main content layout */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          overflow: "hidden",
          bgcolor: "#f5f5f7",
          pt: { xs: 8, md: 0 },
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          {/* Timetable (Left Panel) */}
          <Grid
            // component="div" // Explicitly specify the component
            // item
            // xs={12}
            // md={4}
            // lg={3.5}
            // sx={{
            //   borderRight: "1px solid #e0e0e0",
            //   overflowY: "auto",
            //   bgcolor: "white",
            // }}
          >
            <TimetableList events={eventData} />
          </Grid>

          {/* Calendar (Right Panel) */}
          <Grid
            xs={12}
            md={8}
            lg={8.5}
            // sx={{
            //   overflow: "auto",
            //   p: 2,
            // }}
          >
            <Calendar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MainLayout;
