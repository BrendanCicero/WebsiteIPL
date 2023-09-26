import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditHasilKeuangan from "../components/FormEditHasilKeuangan";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditHasilKeuangan = () => {
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
      <FormEditHasilKeuangan />
    </Layout>
  );
};

export default EditHasilKeuangan;
