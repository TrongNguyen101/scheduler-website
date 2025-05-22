import Header from "../Header/header";
import Navigate from "../Navigate/Navigate";

// DefaultLayout is main layout for student and teacher only include header on the top with navigate and children
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
