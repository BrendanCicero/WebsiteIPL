import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddKeuangan = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

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

  const saveKeuangan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/keuangans", {
        bulan: bulan,
        tahun: tahun,
      });
      navigate("/kelola");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Keuangan</h1>
      <h2 className="subtitle">Tambah Data Keuangan</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveKeuangan}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Bulan</label>
                <div className="control">
                  <div className="select mb-2">
                    <select
                      value={bulan}
                      onChange={(e) => setBulan(e.target.value)}
                      required
                    >
                      <option value=""></option>
                      {months.map((month) => (
                        <option value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Tahun</label>
                <div className="control">
                  <div className="select mb-2">
                    <select
                      value={tahun}
                      onChange={(e) => setTahun(e.target.value)}
                      required
                    >
                      <option value=""></option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddKeuangan;
