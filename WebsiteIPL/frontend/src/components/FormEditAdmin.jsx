import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormEditAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAdminById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admins/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAdminById();
  }, [id]);

  const updateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/admins/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      toast.success("Update berhasil", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      navigate("/pengurus");
    } catch (error) {
      toast.error("Update gagal", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div>
      <h1 className="title">Edit Pengurus Warga</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateAdmin}>
              <p className="has-text-centered">{msg}</p>
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

export default FormEditAdmin;
