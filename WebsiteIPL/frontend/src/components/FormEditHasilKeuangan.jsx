import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import idn from "date-fns/locale/id";
import DatePicker, { registerLocale } from "react-datepicker";

registerLocale("idn", idn);

const FormEditHasilKeuangan = () => {
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [nominal, setNominal] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getLapKeuanganById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/lapkeuangans/${id}`
        );
        setKategori(response.data.kategori);
        setKeterangan(response.data.keterangan);
        setNominal(response.data.nominal);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getLapKeuanganById();
  }, [id]);

  const updateHasilKeuangan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/lapkeuangans/${id}`, {
        kategori: kategori,
        keterangan: keterangan,
        tanggal: tanggal,
        nominal: nominal,
      });
      navigate(`/laporan`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Keuangan</h1>
      <h3 className="subtitle">Edit Hasil Keuangan</h3>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateHasilKeuangan}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kategori</label>
                <div className="control">
                  <div className="select mb-2">
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
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
                    Update
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

export default FormEditHasilKeuangan;
