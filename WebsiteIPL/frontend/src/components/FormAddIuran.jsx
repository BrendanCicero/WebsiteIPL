import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddIuran = () => {
  const [biaya, setBiaya] = useState("");
  const [tahun, setTahun] = useState("");
  const [jenis, setJenis] = useState("");
  const [batasPembayaran, setBatasPembayaran] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const bulans = [
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

  const saveIuran = async (e) => {
    e.preventDefault();
    try {
      for (const bulan of bulans) {
        await axios.post("http://localhost:5000/iurans", {
          biaya: biaya,
          bulan: bulan,
          tahun: tahun,
          jenis: jenis,
          batasPembayaran: batasPembayaran,
          metodePembayaran: metodePembayaran,
        });
      }
      navigate("/iurans");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Tambah Iuran</h1>
      <h2 className="subtitle">Tambah Data Iuran</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveIuran}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Biaya</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={biaya}
                    onChange={(e) => setBiaya(e.target.value)}
                    placeholder="100000"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tahun</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="2023"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Iuran</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={jenis}
                    onChange={(e) => setJenis(e.target.value)}
                    placeholder="Kebersihan, Keamanan, dan lainnya"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Batas Pembayaran Iuran</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={batasPembayaran}
                    onChange={(e) => setBatasPembayaran(e.target.value)}
                    placeholder="15"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Metode Pembayaran</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={metodePembayaran}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                    placeholder="BCA 89xxxx, Mandiri 88xxxx"
                    required
                  />
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

export default FormAddIuran;
