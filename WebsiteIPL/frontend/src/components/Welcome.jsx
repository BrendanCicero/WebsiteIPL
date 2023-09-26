import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const [keuangans, setKeuangans] = useState([]);
  let sum = 0;

  useEffect(() => {
    getAdmins();
    getMembers();
    getKeuangans();
  }, []);

  const getAdmins = async () => {
    const response = await axios.get("http://localhost:5000/admins");
    setAdmins(response.data);
  };

  const getMembers = async () => {
    const response = await axios.get("http://localhost:5000/members");
    setMembers(response.data);
  };

  const getKeuangans = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/lapkeuangans`);
      setKeuangans(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const total = keuangans.map((keuangan) => {
    keuangan.kategori === "pemasukkan"
      ? (sum = sum + keuangan.nominal)
      : (sum = sum - keuangan.nominal);
    return sum;
  });

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>

      {user && user.role === "admin" && (
        <div className="columns mt-auto mb-auto">
          <div className="card has-background-primary column is-4 m-auto">
            <div className="card-content">
              <p className="title has-text-white has-text-centered">
                Jumlah Warga
              </p>
              <p className="title has-text-white has-text-centered">
                {members.length}
              </p>
            </div>
          </div>
          <div className="card has-background-success column is-4 m-auto">
            <div className="card-content">
              <p className="title has-text-white has-text-centered">
                Sisa Saldo
              </p>
              <p className="title has-text-white has-text-centered">
                {`Rp. ${sum.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {user && user.role === "superadmin" && (
        <div className="columns mt-auto mb-auto">
          <div className="card has-background-primary column is-4 m-auto">
            <div className="card-content">
              <p className="title has-text-white has-text-centered">
                Jumlah Pengurus Warga
              </p>
              <p className="title has-text-white has-text-centered">
                {admins.length - 1}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
