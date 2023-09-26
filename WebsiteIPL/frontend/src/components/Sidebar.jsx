import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoCardOutline,
  IoIdCardSharp,
  IoPeople,
  IoPerson,
  IoHome,
  IoLogOut,
  IoBook,
  IoWallet,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/admins");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        {user && user.role === "admin" && (
          <ul className="menu-list">
            <li>
              <NavLink to={"/dashboard"}>
                <IoHome /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/members"}>
                <IoPeople /> Data Warga
              </NavLink>
            </li>
            <li>
              <NavLink to={"/iurans"}>
                <IoCardOutline /> Data Iuran
              </NavLink>
            </li>
            <li>
              <NavLink to={"/pembayaran"}>
                <IoIdCardSharp /> Konfirmasi Pembayaran
              </NavLink>
            </li>
            <li>
              <NavLink to={"/laporan"}>
                <IoBook /> Laporan
              </NavLink>
            </li>
            <li>
              <NavLink to={"/kelola"}>
                <IoWallet /> Kelola Keuangan
              </NavLink>
            </li>
          </ul>
        )}
        {user && user.role === "superadmin" && (
          <ul className="menu-list">
            <li>
              <NavLink to={"/dashboard"}>
                <IoHome /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/pengurus"}>
                <IoPerson /> Data Pengurus Warga
              </NavLink>
            </li>
          </ul>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
