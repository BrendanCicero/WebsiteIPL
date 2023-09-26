import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddMember = () => {
  const [name, setName] = useState("");
  const [norumah, setNoRumah] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveMember = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/members", {
        name: name,
        norumah: norumah,
        email: email,
        password: password,
      });
      navigate("/members");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Tambah Warga</h1>
      <h2 className="subtitle">Tambah Data Warga</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveMember}>
              <p className="has-text-centered">{msg}</p>
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
                <label className="label">Alamat</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={norumah}
                    onChange={(e) => setNoRumah(e.target.value)}
                    placeholder="Jl. xx Blok XX No. XX"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
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

export default FormAddMember;
