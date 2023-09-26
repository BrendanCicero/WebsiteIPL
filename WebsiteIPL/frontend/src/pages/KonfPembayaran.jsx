import React, { useEffect } from "react";
import Layout from "./Layout";
import KonfPembayaranList from "../components/KonfPembayaranList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const KonfPembayaran = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admins");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <KonfPembayaranList />
    </Layout>
  );
};

export default KonfPembayaran;
