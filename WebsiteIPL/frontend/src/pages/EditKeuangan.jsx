import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditKeuangan from "../components/FormEditKeuangan";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditKeuangan = () => {
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
      <FormEditKeuangan />
    </Layout>
  );
};

export default EditKeuangan;
