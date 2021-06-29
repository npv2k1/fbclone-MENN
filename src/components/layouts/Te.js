import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Te({ children }) {
  return (
    <div className="bg-blue-700">
      <h1 className="text-3xl text-gray-600">Layout</h1>
      <div>{children}</div>
    </div>
  );
}
