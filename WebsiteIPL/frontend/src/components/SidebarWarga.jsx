import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIdCardSharp, IoLockOpen, IoLogOut, IoBook } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSliceWarga";
import axios from "axios";

const SidebarWarga = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member, setMember] = useState("");

  useEffect(() => {
    getMeWarga();
  }, []);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const getMeWarga = async () => {
    const response = await axios.get("http://localhost:5000/me/warga");
    setMember(response.data);
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="has-text-centered mt-2">{member.name}</p>
        <p className="has-text-centered">{member.email}</p>
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/pembayaran/warga"}>
              <IoIdCardSharp /> Pembayaran
            </NavLink>
          </li>
          <li>
            <NavLink to={"/password"}>
              <IoLockOpen /> Ubah Password
            </NavLink>
          </li>
          <li>
            <NavLink to={"/keuangan/warga"}>
              <IoBook /> Laporan
            </NavLink>
          </li>
        </ul>

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

export default SidebarWarga;
