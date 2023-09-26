import React from "react";
import NavbarWarga from "../components/NavbarWarga";
import SidebarWarga from "../components/SidebarWarga";

const LayoutWarga = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarWarga />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <SidebarWarga />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LayoutWarga;
