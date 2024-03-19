import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RootState } from "../../store/";
import { useSelector } from "react-redux";

interface ProfileValues {
  firstname: string;
  lastname: string;
  genre: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const id = user ? user.id : "";

  const ProfileSchema = Yup.object().shape({
    firstname: Yup.string()
      .max(50, "Maximum 50 caractères")
      .min(2, "Minimum 2 caractères")
      .matches(/^[a-zA-Z]+$/, "Doit contenir que des lettres"),
    lastname: Yup.string()
      .max(50, "Maximum 50 caractères")
      .min(2, "Minimum 2 caractères")
      .matches(/^[a-zA-Z]+$/, "Doit contenir que des lettres"),
    genre: Yup.string().oneOf(["homme", "femme", "autre"], "Genre invalide"),
    street: Yup.string()
      .max(50, "Maximum 50 caractères")
      .min(2, "Minimum 2 caractères")
      .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, "Adresse invalide"),
    city: Yup.string()
      .max(50, "Maximum 50 caractères")
      .min(2, "Minimum 2 caractères")
      .matches(/^[a-zA-Z\s]{3,}$/, "Ville invalide"),
    zip: Yup.string()
      .max(10, "Maximum 10 caractères")
      .min(2, "Minimum 2 caractères")
      .matches(/^[0-9]{5}$/, "Code postal invalide"),
    country: Yup.string()
      .max(50, "Maximum 50 caractères")
      .min(2, "Minimum 2 caractères")
      .matches(/^[a-zA-Z\s]{3,}$/, "Pays invalide"),
  });
  const submitForm = async (
    values: ProfileValues,
    { setSubmitting }: FormikHelpers<ProfileValues>
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setSubmitting(false);
    } catch (error) {
      console.error(
        "Il y a eu un problème avec votre fetch opération: ",
        error
      );
    }
  };
  return (
    <>
      {user ? (
        <>
          <Formik
            initialValues={{
              firstname: user ? user.firstname : "",
              lastname: user ? user.lastname : "",
              genre: user ? user.genre : "",
              street: user ? user.street : "",
              city: user ? user.city : "",
              zip: user ? user.zip : "",
              country: user ? user.country : "",
            }}
            validationSchema={ProfileSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <label htmlFor="firstname">Prénom</label>
                <Field id="firstname" name="firstname" placeholder="Prénom" />
                <label htmlFor="lastname">Nom</label>
                <Field id="lastname" name="lastname" placeholder="Nom" />
                <label htmlFor="genre">Genre</label>
                <Field as="select" id="genre" name="genre">
                  <option value="">Sélectionnez un genre</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </Field>
                <label htmlFor="street">Adresse</label>
                <Field id="street" name="street" placeholder="Adresse" />
                <label htmlFor="city">Ville</label>
                <Field id="city" name="city" placeholder="Ville" />
                <label htmlFor="zip">Code postal</label>
                <Field id="zip" name="zip" placeholder="Code postal" />
                <label htmlFor="country">Pays</label>
                <Field id="country" name="country" placeholder="Pays" />
                <button type="submit" disabled={isSubmitting}>
                  Enregistrer
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <p>Vous devez être connecté pour accéder à cette page</p>
      )}
    </>
  );
};

export default Profile;
