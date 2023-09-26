import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import idn from "date-fns/locale/id";
import DatePicker, { registerLocale } from "react-datepicker";

registerLocale("idn", idn);

const FormEditKeuangan = () => {
  const [iurans, setIurans] = useState([]);
  const [keuangan, setKeuangan] = useState([]);
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [nominal, setNominal] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  let sum = 0;

  useEffect(() => {
    getIurans();
    getMe();
  }, []);

  const getIurans = async () => {
    const response = await axios.get("http://localhost:5000/iurans");
    setIurans(response.data);
    const response2 = await axios.get(`http://localhost:5000/keuangans/${id}`);
    setKeuangan(response2.data);
  };

  const getMe = async () => {
    const response = await axios.get("http://localhost:5000/me");
    setName(response.data.name);
  };

  const filteredMonthsYearsIuran = iurans.filter((iuran) => {
    return iuran.tahun === keuangan.tahun && iuran.bulan === keuangan.bulan;
  });

  const total = filteredMonthsYearsIuran.map((iuran) => {
    if (iuran.status === true) {
      sum = sum + iuran.biaya;
    }
    return sum;
  });

  const setKategoriGetNominal = (e) => {
    setKategori(e.target.value);
    if (e.target.value === "pemasukkan") {
      setNominal(sum);
    }
  };

  const updateKeuangan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/lapkeuangans/`, {
        kategori: kategori,
        keterangan: keterangan,
        name: name,
        tanggal: tanggal,
        nominal: nominal,
        total: nominal,
      });
      navigate("/laporan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Kelola Keuangan</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateKeuangan}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select mb-2">
                    <select
                      value={kategori}
                      onChange={setKategoriGetNominal}
                      required
                    >
                      <option value=""></option>
                      <option value="pemasukkan">Pemasukkan</option>
                      <option value="pengeluaran">Pengeluaran</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Keterangan</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Seragam Keamanan, Iuran, dan lainnya"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal</label>
                <div className="control">
                  <DatePicker
                    selected={tanggal}
                    locale="idn"
                    dateFormat={"dd MMMM yyyy"}
                    onChange={(date) => setTanggal(date)}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nominal</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={nominal}
                    onChange={(e) => setNominal(e.target.value)}
                    placeholder="100000"
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

export default FormEditKeuangan;
