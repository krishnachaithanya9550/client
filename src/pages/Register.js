import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import "../style.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      // alert(error.message || "Registration failed.");
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      passwordHash: "",
      first_name: "",
      last_name: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      passwordHash: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/\d/, "Password must contain a number")
        .matches(/[!@#$%^&*]/, "Password must contain a special character")
        .required("Password is required"),
      first_name: Yup.string().min(2, "First Name must be at least 2 characters").required("First Name is required"),
      last_name: Yup.string().min(2, "Last Name must be at least 2 characters").required("Last Name is required"),
      role: Yup.string().oneOf(["Student", "Instructor", "Admin"], "Invalid role").required("Role is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await dispatch(registerUser(values)).unwrap();
        localStorage.setItem("userEmail", values.email); // Store email in localStorage
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      } catch (error) {
        // alert("Registration failed: " + (error.message || "An error occurred"));
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" name="username" placeholder="Username" {...formik.getFieldProps("username")} />
        {formik.touched.username && formik.errors.username && <p className="error">{formik.errors.username}</p>}

        <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

        <input type="password" name="passwordHash" placeholder="Password" {...formik.getFieldProps("passwordHash")} />
        {formik.touched.passwordHash && formik.errors.passwordHash && <p className="error">{formik.errors.passwordHash}</p>}

        <input type="text" name="first_name" placeholder="First Name" {...formik.getFieldProps("first_name")} />
        {formik.touched.first_name && formik.errors.first_name && <p className="error">{formik.errors.first_name}</p>}

        <input type="text" name="last_name" placeholder="Last Name" {...formik.getFieldProps("last_name")} />
        {formik.touched.last_name && formik.errors.last_name && <p className="error">{formik.errors.last_name}</p>}

        <select name="role" {...formik.getFieldProps("role")}>
          <option value="">Select a Role</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Admin">Admin</option>
        </select>
        {formik.touched.role && formik.errors.role && <p className="error">{formik.errors.role}</p>}

        <button type="submit" disabled={formik.isSubmitting}>Register</button>
      </form>
    </div>
  );
};

export default Register;
