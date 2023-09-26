import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import idn from "date-fns/locale/id";
import DatePicker, { registerLocale } from "react-datepicker";

registerLocale("idn", idn);

const FormBuktiBayar = () => {
  const [date, setDate] = useState();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [meWarga, setMeWarga] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getMeWarga();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const getMeWarga = async () => {
    const response = await axios.get("http://localhost:5000/me/warga");
    setMeWarga(response.data);
  };

  const saveBukti = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("date", date);
    try {
      await axios.patch(`http://localhost:5000/members/paid/${meWarga.id}`, {
        isPaid: true,
      });
      await axios.patch(`http://localhost:5000/iurans/bukti/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/pembayaran/warga");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="title">Upload Bukti Bayar</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBukti}>
              <div className="field">
                <label className="label">Tanggal Bayar</label>
                <div className="control">
                  <DatePicker
                    selected={date}
                    locale="idn"
                    dateFormat={"dd MMMM yyyy"}
                    onChange={(date) => setDate(date)}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Bukti Pembayaran</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                        required
                      />
                      <span className="file-cta">
                        <span className="file-label">Pilih file</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
                  </button>
                </div>
              </div>

              {preview ? (
                <a href={preview} target="_blank" rel="noreferrer">
                  <figure
                    className="image is-128x128"
                    style={{ paddingBottom: "300px" }}
                  >
                    <img src={preview} alt="" />
                  </figure>
                </a>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuktiBayar;
