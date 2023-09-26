import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormAddAdmin = () => {
  const [name, setName] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [listProvinsi, setListProvinsi] = useState([]);
  const [kabkota, setKabkota] = useState("");
  const [listKabkota, setListKabkota] = useState([]);
  const [kecamatan, setKecamatan] = useState("");
  const [listKecamatan, setListKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState("");
  const [listKelurahan, setListKelurahan] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getListProvinsi();
  }, []);

  const getListProvinsi = async () => {
    const response = await fetch(
      `https://brendancicero.github.io/api-wilayah-indonesia/api/provinces.json`
    );
    const provinces = await response.json();
    setListProvinsi(provinces);
  };

  const setProvGetListKabkota = async (e) => {
    setProvinsi(e.target.value);
    const response = await fetch(
      `https://brendancicero.github.io/api-wilayah-indonesia/api/regencies/${e.target.value}.json`
    );
    const kabkota = await response.json();
    setListKabkota(kabkota);
  };

  const setKabkotaGetKec = async (e) => {
    setKabkota(e.target.value);
    const response = await fetch(
      `https://brendancicero.github.io/api-wilayah-indonesia/api/districts/${e.target.value}.json`
    );
    const kecamatan = await response.json();
    setListKecamatan(kecamatan);
  };

  const setKecGetKel = async (e) => {
    setKecamatan(e.target.value);
    const response = await fetch(
      `https://brendancicero.github.io/api-wilayah-indonesia/api/villages/${e.target.value}.json`
    );
    const kelurahan = await response.json();
    setListKelurahan(kelurahan);
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admins", {
        name: name,
        provinsi: provinsi,
        kabkota: kabkota,
        kecamatan: kecamatan,
        kelurahan: kelurahan,
        email: email,
        password: password,
        confPassword: confPassword,
        role: "admin",
      });
      toast.success("Registrasi berhasil", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      navigate("/pengurus");
    } catch (error) {
      toast.error("Registrasi gagal", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div>
      <h1 className="title">Tambah Pengurus Warga</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={Register}>
              <div className="field">
                <label className="label">Nama</label>
                <div className="controls">
                  <input
                    type="text"
                    className="input"
                    placeholder="Nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Provinsi</label>
                <div className="select">
                  <select
                    value={provinsi}
                    onChange={setProvGetListKabkota}
                    required
                  >
                    <option value=""></option>
                    {listProvinsi.map((province) => (
                      <option value={province.id}>{province.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Kabupaten/Kota</label>
                <div className="select">
                  <select value={kabkota} onChange={setKabkotaGetKec} required>
                    <option value=""></option>
                    {listKabkota.map((kabkota) => (
                      <option value={kabkota.id}>{kabkota.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Kecamatan</label>
                <div className="select">
                  <select value={kecamatan} onChange={setKecGetKel} required>
                    <option value=""></option>
                    {listKecamatan.map((kecamatan) => (
                      <option value={kecamatan.id}>{kecamatan.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Kelurahan</label>
                <div className="select">
                  <select
                    value={kelurahan}
                    onChange={(e) => setKelurahan(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    {listKelurahan.map((kelurahan) => (
                      <option value={kelurahan.id}>{kelurahan.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="controls">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="controls">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Konfirmasi Password</label>
                <div className="controls">
                  <input
                    type="password"
                    className="input"
                    placeholder="Konfirmasi Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
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

export default FormAddAdmin;
