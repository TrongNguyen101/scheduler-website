import Header from "../Header/header";
import Navigate from "../Navigate/Navigate";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <Navigate />
      </Header>

      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
