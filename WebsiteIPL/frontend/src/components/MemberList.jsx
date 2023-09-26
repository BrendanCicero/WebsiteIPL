import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const response = await axios.get("http://localhost:5000/members");
    setMembers(response.data);
  };

  const deleteMember = async (memberId) => {
    await axios.delete(`http://localhost:5000/members/${memberId}`);
    getMembers();
  };

  return (
    <div>
      <h1 className="title">Data Warga</h1>
      <Link to="/members/add" className="button is-primary mb-2">
        Tambah Warga
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1} </td>
              <td>{member.name} </td>
              <td>{member.norumah} </td>
              <td>
                <Link
                  to={`/members/edit/${member.id}`}
                  className="button is-small is-info mb-2 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMember(member.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
