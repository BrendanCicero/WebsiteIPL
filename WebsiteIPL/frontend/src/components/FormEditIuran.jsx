import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditIuran = () => {
  const [biaya, setBiaya] = useState("");
  const [jenis, setJenis] = useState("");
  const [batasPembayaran, setBatasPembayaran] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getIuranById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/iurans/${id}`);
        setBiaya(response.data.biaya);
        setJenis(response.data.jenis);
        setBatasPembayaran(response.data.batasPembayaran);
        setMetodePembayaran(response.data.metodePembayaran);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getIuranById();
  }, [id]);

  const updateIuran = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/iurans/${id}`, {
        biaya: biaya,
        jenis: jenis,
        batasPembayaran: batasPembayaran,
        metodePembayaran: metodePembayaran,
      });
      navigate("/iurans");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Data Iuran</h1>
      <h2 className="subtitle">Edit Data Iuran</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateIuran}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Biaya</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={biaya}
                    onChange={(e) => setBiaya(e.target.value)}
                    placeholder="100000"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis</label>
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
                <label className="label">Batas Pembayaran</label>
                <div className="control">
                  <input
                    type="text"
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

export default FormEditIuran;
