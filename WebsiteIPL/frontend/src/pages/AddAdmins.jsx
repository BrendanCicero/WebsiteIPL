import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddAdmin from "../components/FormAddAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddAdmin = () => {
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
      <FormAddAdmin />
    </Layout>
  );
};

export default AddAdmin;
