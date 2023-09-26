import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditMember from "../components/FormEditMember";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditMember = () => {
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
      <FormEditMember />
    </Layout>
  );
};

export default EditMember;
