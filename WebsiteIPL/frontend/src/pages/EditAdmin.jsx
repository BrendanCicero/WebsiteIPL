import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditAdmin from "../components/FormEditAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admins");
    }
    if (user && user.role !== "superadmin") {
      navigate("/admins");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <FormEditAdmin />
    </Layout>
  );
};

export default EditAdmin;
