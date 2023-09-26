import React, { useState, useEffect } from "react";
import axios from "axios";
import { showFormattedDate } from "../utils/date";

const LapPembayaranList = () => {
  const [members, setMembers] = useState([]);
  const [iurans, setIurans] = useState([]);
  const [filterYears, setFilterYears] = useState("2023");
  const [filterMonths, setFilterMonths] = useState("Januari");
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

  useEffect(() => {
    getMembers();
    getIurans();
  }, []);

  const getMembers = async () => {
    const response = await axios.get("http://localhost:5000/members");
    setMembers(response.data);
  };

  const getIurans = async () => {
    const response = await axios.get("http://localhost:5000/iurans");
    setIurans(response.data);
  };

  const filteredMonthsYearsIuran = iurans.filter((iuran) => {
    return iuran.tahun === filterYears && iuran.bulan === filterMonths;
  });

  const changeStatus = async (iuranId, memberId, tanggal, nominal, name) => {
    const response = await axios.get(`http://localhost:5000/iurans/${iuranId}`);
    const response2 = await axios.get(
      `http://localhost:5000/members/${memberId}`
    );

    if (response.data.status === true && response2.data.status === true) {
      await axios.patch(`http://localhost:5000/iurans/status/${iuranId}`, {
        status: false,
      });
      await axios.patch(`http://localhost:5000/members/status/${memberId}`, {
        status: false,
      });
    } else {
      await axios.patch(`http://localhost:5000/iurans/status/${iuranId}`, {
        status: true,
      });
      await axios.patch(`http://localhost:5000/members/status/${memberId}`, {
        status: true,
      });
      await axios.post(`http://localhost:5000/lapkeuangans`, {
        kategori: "pemasukkan",
        keterangan: "Iuran Warga",
        name: name,
        tanggal: tanggal,
        nominal: nominal,
      });
    }
    getMembers();
    getIurans();
  };

  return (
    <div>
      <h1 className="title">Konfirmasi Pembayaran</h1>
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
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Biaya</th>
            <th>Tanggal Bayar</th>
            <th>Status</th>
            <th>Bukti</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) =>
            filteredMonthsYearsIuran.map((iuran) => (
              <tr key={member.id}>
                <td>{index + 1} </td>
                <td>{member.name} </td>
                <td>{`Rp. ${iuran.biaya.toLocaleString()}`}</td>
                <td>
                  {iuran.image !== null && member.isPaid === true
                    ? showFormattedDate(iuran.tanggalBayar)
                    : ""}
                </td>
                {iuran.status === true && member.status === true ? (
                  <button className="button is-small is-success">
                    Sudah Bayar
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      changeStatus(
                        iuran.id,
                        member.id,
                        showFormattedDate(iuran.tanggalBayar),
                        iuran.biaya,
                        member.name
                      )
                    }
                    className="button is-small is-warning"
                  >
                    Belum Bayar
                  </button>
                )}
                <td>
                  {iuran.image !== null && member.isPaid === true ? (
                    <a href={iuran.url} target="_blank" rel="noreferrer">
                      <figure
                        className="image is-24x24"
                        style={{ paddingBottom: "35px" }}
                      >
                        <img src={iuran.url} alt="" />
                      </figure>
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LapPembayaranList;
