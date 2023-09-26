import React, { useEffect } from "react";
import LayoutWarga from "./LayoutWarga";
import PembayaranWargaList from "../components/PembayaranWargaList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSliceWarga";

const PembayaranWarga = () => {
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
      <PembayaranWargaList />
    </LayoutWarga>
  );
};

export default PembayaranWarga;
