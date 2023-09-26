import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Adminlist = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    const response = await axios.get("http://localhost:5000/admins");
    setAdmins(response.data);
  };

  const deleteAdmin = async (adminId) => {
    await axios.delete(`http://localhost:5000/admins/${adminId}`);
    getAdmins();
  };

  return (
    <div>
      <h1 className="title">Data Pengurus Warga</h1>
      <h2 className="subtitle">Daftar Pengurus Warga</h2>
      <Link to="/pengurus/add" className="button is-primary mb-2">
        Tambah Pengurus Warga
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(
            (admin, index) =>
              admin.role !== "superadmin" && (
                <tr key={admin.id}>
                  <td>{index}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <Link
                      to={`/pengurus/edit/${admin.id}`}
                      className="button is-small is-info mb-2 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteAdmin(admin.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Adminlist;
