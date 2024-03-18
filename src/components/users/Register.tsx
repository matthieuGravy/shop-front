import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
//import ReCAPTCHA from "react-google-recaptcha";

interface MyFormValues {
  email: string;
  password: string;
}

const Contactpage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  /*
  const handleRecaptcha = (value) => {
    console.log(value);
  };*/
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Requis"),
    password: Yup.string()
      .required("Requis")
      .min(8, "Minimum 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .test(
        "password",
        "Le mot de passe doit être différent de l'email",
        function (value) {
          return value !== this.parent.email;
        }
      ),
  });
  const submitForm = async (
    values: MyFormValues,
    { setSubmitting }: FormikHelpers<MyFormValues>
  ) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //const data = await response.json();
      setFormSubmitted(true);
      console.log("Form submitted");
    } catch (error) {
      console.error(
        "Il y a eu un problème avec votre fetch opération: ",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {formSubmitted ? (
        <p>Votre formulaire a bien été envoyé</p>
      ) : (
        /*<ReCAPTCHA sitekey="votre-clé-de-site" onChange={handleRecaptcha}> */
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={submitForm}
        >
          {({ errors, touched, values }) => (
            <Form className="">
              <section className="">
                <label className="relative">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={` ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : values.email === ""
                        ? "border-natural-50"
                        : "border-green-500"
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="absolute text-red-500 left-1">
                      {errors.email}
                    </p>
                  ) : null}
                </label>
                <label className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`${
                      errors.password && touched.password
                        ? "border-red-500"
                        : values.nom === ""
                        ? "border-natural-50"
                        : "border-green-500"
                    }`}
                  />
                  {errors.password && touched.password ? (
                    <p className="absolute text-red-500 left-1">
                      {errors.password}
                    </p>
                  ) : null}
                </label>
              </section>
              <button type="submit" className="">
                Envoyer
              </button>
            </Form>
          )}
        </Formik>
        /*</ReCAPTCHA>*/
      )}
    </>
  );
};

export default Contactpage;
