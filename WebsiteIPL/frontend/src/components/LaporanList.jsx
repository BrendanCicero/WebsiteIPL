import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/date";

const LaporanList = () => {
  const [hasilKeuangans, setHasilKeuangans] = useState([]);
  const [keuangans, setKeuangans] = useState([]);
  const [msg, setMsg] = useState("");
  const [filterMonths, setFilterMonths] = useState("Januari");
  const [filterYears, setFilterYears] = useState("2023");
  const tahuns = [
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];
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
  let sum = 0;

  useEffect(() => {
    getHasilKeuangans();
    getKeuangans();
  }, []);

  const getHasilKeuangans = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/lapkeuangans`);
      setHasilKeuangans(response.data);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const getKeuangans = async () => {
    const response = await axios.get("http://localhost:5000/keuangans");
    setKeuangans(response.data);
  };

  const filteredMonthsYearsHasilKeuangan = hasilKeuangans.filter(
    (hasilKeuangan) => {
      const month = showFormattedDate(hasilKeuangan.tanggal).split(" ")[1];
      const year = showFormattedDate(hasilKeuangan.tanggal).split(" ")[2];
      return year === filterYears && month === filterMonths;
    }
  );

  const filteredMonthsYearsKeuangan = keuangans.filter((keuangan) => {
    return keuangan.tahun === filterYears && keuangan.bulan === filterMonths;
  });

  const total = filteredMonthsYearsHasilKeuangan.map((keuangan) => {
    keuangan.kategori === "pemasukkan"
      ? (sum = sum + keuangan.nominal)
      : (sum = sum - keuangan.nominal);
    return sum;
  });

  return (
    <div>
      <h1 className="title">Laporan</h1>
      <div className="field">
        <div className="columns">
          <div className="column is-2">
            <label className="label">Bulan</label>
            <div className="control">
              <div className="select mb-2">
                <select
                  value={filterMonths}
                  onChange={(e) => setFilterMonths(e.currentTarget.value)}
                >
                  {bulans.map((bulan) => (
                    <option value={bulan}>{bulan}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="column is-2">
            <label className="label">Tahun</label>
            <div className="control">
              <div className="select mb-2">
                <select
                  value={filterYears}
                  onChange={(e) => setFilterYears(e.currentTarget.value)}
                >
                  {tahuns.map((tahun) => (
                    <option value={tahun}>{tahun}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="has-text-centered">{msg}</p>
      {filteredMonthsYearsKeuangan.map(() => (
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Nominal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMonthsYearsHasilKeuangan.map((keuangan, index) => (
              <tr key={keuangan.id}>
                <td>{index + 1} </td>
                <td>{keuangan.kategori} </td>
                <td>{keuangan.keterangan} </td>
                <td>{keuangan.name} </td>
                <td>{showFormattedDate(keuangan.tanggal)} </td>
                <td>{keuangan.nominal.toLocaleString()} </td>
                <td>
                  <Link
                    to={`/keuangans/preview/edit/${keuangan.id}`}
                    className="button is-small is-info mb-2 mr-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Sisa Saldo</td>
              <td>{sum.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default LaporanList;
