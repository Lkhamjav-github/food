import React from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendContactForm } from "../lib/api";

const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name is too short!")
    .max(50, "First Name is too long!")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name is too short!")
    .max(50, "Last Name is too long!")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(7, "Phone number must be 8 digits")
    .max(14, "Phone number is too long!")
    .matches(/^[0-9 +]+$/, "Please enter only numbers")
    .required("Phone number is required"),
  message: Yup.string()
    .min(8, "Message must be at least 8 characters long")
    .required("Message is required"),
});

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[34px]">Contact Us</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await sendContactForm(values);
            alert("Form submitted successfully!");
          } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Form className="mt-4 flex-col justify-center items-center flex w-[446px] gap-4">
            <div className="flex w-full justify-between gap-3">
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "green",
                    },
                    "&:hover fieldset": {
                      borderColor: "green",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "green",
                  },
                  "& .MuiInputLabel-root:hover": {
                    color: "green",
                  },
                }}
              />

              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "green",
                    },
                    "&:hover fieldset": {
                      borderColor: "green",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "green",
                  },
                  "& .MuiInputLabel-root:hover": {
                    color: "green",
                  },
                }}
              />
            </div>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "green",
                  },
                  "&:hover fieldset": {
                    borderColor: "green",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "green",
                },
                "& .MuiInputLabel-root:hover": {
                  color: "green",
                },
              }}
            />

            <TextField
              label="Phone Number"
              name="phone"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "gray", // Default label color
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "green", // Change border color when focused
                  },
                  "&:hover fieldset": {
                    borderColor: "green", // Change border color when hovered
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "green", // Change label color when focused
                },
                "& .MuiInputLabel-root:hover": {
                  color: "green", // Change label color when hovered
                },
              }}
            />

            <TextField
              label="Message"
              name="message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "green",
                  },
                  "&:hover fieldset": {
                    borderColor: "green",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "green",
                },
                "& .MuiInputLabel-root:hover": {
                  color: "green",
                },
              }}
            />

            <Button
              className="font-bold text-white h-[36.5px]"
              type="submit"
              disabled={
                Boolean(touched.message && errors.message) ||
                Boolean(touched.firstName && errors.firstName) ||
                Boolean(touched.lastName && errors.lastName) ||
                Boolean(touched.email && errors.email) ||
                Boolean(touched.phone && errors.phone)
              }
              variant="contained"
              sx={{
                backgroundColor: isSubmitting ? "lightgreen" : "green",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                "&:disabled": {
                  cursor: "not-allowed",
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{ position: "absolute", color: "white" }}
                  />{" "}
                </>
              ) : (
                "Send"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
