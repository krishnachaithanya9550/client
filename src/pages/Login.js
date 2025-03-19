import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import "../style.css";

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
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await dispatch(loginUser(values)).unwrap();
        localStorage.setItem("userEmail", values.email); // Store email in localStorage
        navigate("/dashboard");
      } catch (error) {
        alert("Login failed: " + (error.message || "Invalid credentials"));
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error.message || "Login failed."}</p>}
      <form onSubmit={formik.handleSubmit}>
        <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

        <input type="password" name="password" placeholder="Password" {...formik.getFieldProps("password")} />
        {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}

        <button type="submit" disabled={formik.isSubmitting}>Login</button>
      </form>
    </div>
  );
};

export default Login;
