import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import axios from "axios";

const KelolaKeuanganList = () => {
  const [filterYears, setFilterYears] = useState("2023");
  const [keuangans, setKeuangans] = useState([]);
  const years = [
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];

  useEffect(() => {
    getKeuangans();
  }, []);

  const getKeuangans = async () => {
    const response = await axios.get("http://localhost:5000/keuangans");
    setKeuangans(response.data);
  };

  const deleteKeuangan = async (keuanganId) => {
    await axios.delete(`http://localhost:5000/keuangans/${keuanganId}`);
    getKeuangans();
  };

  const filteredYearsKeuangan = keuangans.filter((keuangan) => {
    return keuangan.tahun === filterYears;
  });

  return (
    <div>
      <h1 className="title">Kelola Keuangan</h1>
      <Link to="/keuangans/add" className="button is-primary mb-2">
        Tambah Laporan
      </Link>
      <div className="field">
        <label className="label">Tahun</label>
        <div className="control">
          <div className="select mb-2">
            <select
              value={filterYears}
              onChange={(e) => setFilterYears(e.currentTarget.value)}
            >
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Bulan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredYearsKeuangan.map((keuangan, index) => (
            <tr key={keuangan.id}>
              <td>{index + 1} </td>
              <td>{keuangan.bulan} </td>
              <td>
                <Link
                  to={`/keuangans/edit/${keuangan.id}`}
                  className="button is-small is-info mb-2 mr-2"
                >
                  Edit Laporan
                </Link>
                {/* <button
                  onClick={() => deleteKeuangan(keuangan.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KelolaKeuanganList;
