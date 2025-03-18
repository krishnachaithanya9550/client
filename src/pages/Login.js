import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import '../style.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "At least 6 characters").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/dashboard");
        }
      });
    },
  });

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error.message || "Login failed."}</p>}
      <form onSubmit={formik.handleSubmit}>
        <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
        <input type="password" name="password" placeholder="Password" {...formik.getFieldProps("password")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


