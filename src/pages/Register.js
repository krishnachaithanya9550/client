import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import '../style.css'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      alert(error.message || "Registration failed.");
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
      username: Yup.string().min(3, "At least 3 characters").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      passwordHash: Yup.string()
        .min(6, "At least 6 characters")
        .matches(/\d/, "Must contain a number")
        .matches(/[!@#$%^&*]/, "Must contain a special character")
        .required("Required"),
      first_name: Yup.string().min(2, "At least 2 characters").required("Required"),
      last_name: Yup.string().min(2, "At least 2 characters").required("Required"),
      role: Yup.string().oneOf(["Student", "Instructor", "Admin"], "Invalid role").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("Registration Successful! Redirecting...");
          navigate("/login");
        }
      });
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
