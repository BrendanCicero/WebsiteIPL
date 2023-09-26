import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddKeuangan from "../components/FormAddKeuangan";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddKeuangan = () => {
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
      <FormAddKeuangan />
    </Layout>
  );
};

export default AddKeuangan;
