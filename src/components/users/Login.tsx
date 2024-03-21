import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  UserActionTypes,
} from "../../store/actions/actionConnection";
import { NavLink, useNavigate } from "react-router-dom";

//import ReCAPTCHA from "react-google-recaptcha";

interface MyFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const user = await response.json();
      console.log(user);
      if (user && user.id) {
        dispatch(loginSuccess({ user }));
      } else {
        console.error("User data is undefined");
      }
      navigate("/");
      console.log("Form submitted");
    } catch (error) {
      console.error(
        "Il y a eu un problème avec votre fetch opération: ",
        error
      );
    }
    setSubmitting(false);
  };

  return (
    <>
      {/*<ReCAPTCHA sitekey="votre-clé-de-site" onChange={handleRecaptcha}> */}
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={submitForm}
      >
        {({ errors, touched, values }) => (
          <>
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
                        : values.password === ""
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
            <article>
              <p>Pas encore inscrit ?</p>
              <NavLink to="/register">Inscrivez-vous</NavLink>
            </article>
          </>
        )}
      </Formik>
      {/*</ReCAPTCHA>*/}
    </>
  );
};

export default Login;
