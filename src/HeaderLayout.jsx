import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function HeaderLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HeaderLayout;