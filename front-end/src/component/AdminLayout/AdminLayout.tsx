import Header from "../Header/header";
import { Sidebar } from "../Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
