import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormEditPasswordWarga = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getMemberById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/me/warga`);
        setId(response.data.id);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getMemberById();
  }, [id]);

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/members/warga/${id}`, {
        password: password,
        confPassword: confPassword,
      });
      toast.success("Ubah Password berhasil", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      navigate("/pembayaran/warga");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Ubah Password</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePassword}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Password Baru</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Konfirmasi Password Baru</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
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

export default FormEditPasswordWarga;
