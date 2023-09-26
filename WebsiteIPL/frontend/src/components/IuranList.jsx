import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const IuranList = () => {
  const [filterYears, setFilterYears] = useState("2023");
  const [iurans, setIurans] = useState([]);
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
    getIurans();
  }, []);

  const getIurans = async () => {
    const response = await axios.get("http://localhost:5000/iurans");
    setIurans(response.data);
  };

  const deleteIuran = async (iuranId) => {
    await axios.delete(`http://localhost:5000/iurans/${iuranId}`);
    getIurans();
  };

  const filteredYearsIuran = iurans.filter((iuran) => {
    return iuran.tahun === filterYears;
  });

  return (
    <div>
      <h1 className="title">Data Iuran</h1>
      {filteredYearsIuran.length === 0 ? (
        <Link to="/iurans/add" className="button is-primary mb-2">
          Tambah Iuran
        </Link>
      ) : (
        <div></div>
      )}
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
        {filteredYearsIuran.length === 0 ? (
          ""
        ) : (
          <strong>
            <p className="mt-2">
              {`Biaya iuran sebesar  Rp. ${iurans[0].biaya.toLocaleString()} yang berupa iuran ${
                iurans[0].jenis
              }, batas pembayaran iuran ialah setiap tanggal ${
                iurans[0].batasPembayaran
              } tiap bulannya dengan metode dan nomor pembayaran melalui ${
                iurans[0].metodePembayaran
              }`}
            </p>
          </strong>
        )}
      </div>
      {/* <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Biaya</th>
            <th>Bulan</th>
            <th>Jenis</th>
            <th>Batas Pembayaran</th>
            <th>Metode Pembayaran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredYearsIuran.map((iuran, index) => (
            <tr key={iuran.id}>
              <td>{index + 1} </td>
              <td>{`Rp. ${iuran.biaya.toLocaleString()}`}</td>
              <td>{iuran.bulan} </td>
              <td>{iuran.jenis} </td>
              <td>
                {`${iuran.batasPembayaran} ${iuran.bulan} ${iuran.tahun}`}{" "}
              </td>
              <td>{iuran.metodePembayaran} </td>
              <td>
                <Link
                  to={`/iurans/edit/${iuran.id}`}
                  className="button is-small is-info mb-2 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteIuran(iuran.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default IuranList;
