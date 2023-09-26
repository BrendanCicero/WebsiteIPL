import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditMember = () => {
  const [name, setName] = useState("");
  const [norumah, setNoRumah] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getMemberById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/members/${id}`);
        setName(response.data.name);
        setNoRumah(response.data.norumah);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getMemberById();
  }, [id]);

  const updateMember = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/members/${id}`, {
        name: name,
        norumah: norumah,
        password: password,
        confPassword: confPassword,
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
      <h1 className="title">Data Warga</h1>
      <h2 className="subtitle">Edit Data Warga</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateMember}>
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
                    placeholder="No Rumah"
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
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
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

export default FormEditMember;
