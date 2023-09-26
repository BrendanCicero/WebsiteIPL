import React, { useState, useEffect } from "react";
import { IoCloudUpload } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/date";

const PembayaranWargaList = () => {
  const [filterYears, setFilterYears] = useState("2023");
  const [meWarga, setMeWarga] = useState([]);
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
    getMeWarga();
    getIurans();
  }, []);

  const getMeWarga = async () => {
    const response = await axios.get("http://localhost:5000/me/warga");
    setMeWarga(response.data);
  };

  const getIurans = async () => {
    const response = await axios.get("http://localhost:5000/iurans/warga");
    setIurans(response.data);
  };

  const filteredYearsIuran = iurans.filter((iuran) => {
    return iuran.tahun === filterYears;
  });

  return (
    <div>
      <h1 className="title">Pembayaran</h1>
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
          {filteredYearsIuran.length === 0 ? (
            ""
          ) : (
            <strong>
              <p className="mt-2">
                {`Biaya iuran sebesar Rp. ${iurans[0].biaya.toLocaleString()} yang berupa iuran ${
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
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            {/* <th>Biaya</th> */}
            <th>Bulan</th>
            {/* <th>Jenis</th> */}
            {/* <th>Batas Pembayaran</th> */}
            {/* <th>Metode Pembayaran</th> */}
            <th>Tanggal Bayar</th>
            <th>Status</th>
            <th>Bukti</th>
          </tr>
        </thead>
        <tbody>
          {filteredYearsIuran.map((iuran, index) => (
            <tr key={iuran.id}>
              <td>{index + 1} </td>
              {/* <td>{`Rp. ${iuran.biaya.toLocaleString()}`}</td> */}
              <td>{iuran.bulan} </td>
              {/* <td>{iuran.jenis} </td> */}
              {/* <td>
                {`${iuran.batasPembayaran} ${iuran.bulan} ${iuran.tahun}`}{" "}
              </td> */}
              {/* <td>{iuran.metodePembayaran} </td> */}
              <td>
                {iuran.image !== null && meWarga.isPaid === true
                  ? showFormattedDate(iuran.tanggalBayar)
                  : ""}
              </td>
              {iuran.status === true && meWarga.status === true ? (
                <button className="button is-small is-success">
                  Sudah Bayar
                </button>
              ) : (
                <button className="button is-small is-warning">
                  Belum Bayar
                </button>
              )}
              <td>
                {iuran.image !== null && meWarga.isPaid === true ? (
                  <Link to={`/update/bukti/${iuran.id}`}>
                    <figure
                      className="image is-24x24"
                      style={{ paddingBottom: "35px" }}
                    >
                      <img src={iuran.url} alt="" />
                    </figure>
                  </Link>
                ) : (
                  <Link to={`/upload/${iuran.id}`}>
                    <IoCloudUpload size="30px" cursor="pointer" />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PembayaranWargaList;
