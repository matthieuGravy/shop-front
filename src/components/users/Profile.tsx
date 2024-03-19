import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RootState } from "../../store/";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  const [isEditing, setIsEditing] = useState({
    firstname: false,
    lastname: false,
    genre: false,
    street: false,
    city: false,
    zip: false,
    country: false,
  });

  const id = user ? user.id : "";

  const [userData, setUserData] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data; // Ajoutez cette ligne
    } catch (error) {
      console.error(
        "Il y a eu un problème avec votre fetch opération: ",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      setUserData(data);
    };

    fetchData();
  }, []);

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
          {userData ? (
            <Formik
              initialValues={{
                firstname: userData.firstname,
                lastname: userData.lastname,
                genre: userData.genre,
                street: userData.street,
                city: userData.city,
                zip: userData.zip,
                country: userData.country,
              }}
              validationSchema={ProfileSchema}
              onSubmit={submitForm}
            >
              {({ isSubmitting }) => (
                <>
                  <Form className="flex flex-col">
                    <label htmlFor="firstname">Firstname</label>
                    {isEditing.firstname ? (
                      <Field
                        id="firstname"
                        name="firstname"
                        onBlur={() =>
                          setIsEditing({ ...isEditing, firstname: false })
                        }
                      />
                    ) : (
                      <>
                        <div>{userData.firstname}</div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, firstname: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}
                    <label htmlFor="lastname">Lastname</label>
                    {isEditing.lastname ? (
                      <Field id="lastname" name="lastname" />
                    ) : (
                      <>
                        <div
                          className="text-red-300"
                          onClick={() =>
                            setIsEditing({ ...isEditing, lastname: true })
                          }
                        >
                          {userData.lastname}
                        </div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, lastname: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}
                    <label htmlFor="genre">Genre</label>
                    {isEditing.genre ? (
                      <Field as="select" id="genre" name="genre">
                        <option value="">Sélectionnez un genre</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="autre">Autre</option>
                      </Field>
                    ) : (
                      <>
                        <div className="">{userData.genre}</div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, genre: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}
                    <label htmlFor="street">Adresse</label>
                    {isEditing.street ? (
                      <Field id="street" name="street" />
                    ) : (
                      <>
                        <div className="">{userData.street}</div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, street: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}
                    <label htmlFor="city">City</label>
                    {isEditing.city ? (
                      <Field id="city" name="city" />
                    ) : (
                      <>
                        <div className="">{userData.city}</div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, city: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}

                    <label htmlFor="zip">Zip code</label>
                    {isEditing.zip ? (
                      <Field id="zip" name="zip" />
                    ) : (
                      <>
                        <div className="">{userData.zip}</div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, zip: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}

                    <label htmlFor="country">Country</label>
                    {isEditing.country ? (
                      <Field id="country" name="country" />
                    ) : (
                      <>
                        <div className="">{userData.country}</div>
                        <button
                          onClick={() =>
                            setIsEditing({ ...isEditing, country: true })
                          }
                        >
                          Edit
                        </button>
                      </>
                    )}

                    <button type="submit" disabled={isSubmitting}>
                      Send
                    </button>
                  </Form>
                </>
              )}
            </Formik>
          ) : (
            <p>Loading...</p>
          )}
        </>
      ) : (
        <p>You must be logged in to access this page.</p>
      )}
    </>
  );
};

export default Profile;
