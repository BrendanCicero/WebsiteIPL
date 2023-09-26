import React, { useEffect } from "react";
import LayoutWarga from "./LayoutWarga";
import KeuanganWargaList from "../components/KeuanganWargaList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSliceWarga";

const KeuanganWarga = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.authwarga);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <LayoutWarga>
      <KeuanganWargaList />
    </LayoutWarga>
  );
};

export default KeuanganWarga;
