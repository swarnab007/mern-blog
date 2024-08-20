import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;