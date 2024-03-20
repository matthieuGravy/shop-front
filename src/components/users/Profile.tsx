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
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    genre: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      setUserData(data);
      setInitialUserData(data);
    };

    fetchData();
  }, []);

  const [initialUserData, setInitialUserData] = useState({
    firstname: "",
    lastname: "",
    genre: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  const ProfileSchema = Yup.object().shape({
    firstname: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Z]+$/, "Must contain only letters"),
    lastname: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Z]+$/, "Must contain only letters"),
    genre: Yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender"),
    street: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, "Invalid address"),
    city: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Z\s]{3,}$/, "Invalid city"),
    zip: Yup.string()
      .max(10, "Maximum 10 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[0-9]{5}$/, "Invalid postal code"),
    country: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Z\s]{3,}$/, "Invalid country"),
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
        body: JSON.stringify(initialUserData),
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
  const vide = "No data";

  return (
    <>
      {user ? (
        <>
          <Formik
            initialValues={userData}
            validationSchema={ProfileSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <>
                <Form className="grid grid-cols-3 gap-x-8">
                  <label htmlFor="firstname">Firstname</label>
                  {isEditing.firstname ? (
                    <>
                      <Field
                        id="firstname"
                        name="firstname"
                        onBlur={() => {
                          setIsEditing({ ...isEditing, firstname: false });
                          setInitialUserData({
                            ...initialUserData,
                            firstname: event.target.value,
                          });
                        }}
                      />
                      <button
                        onClick={() =>
                          setIsEditing({ ...isEditing, firstname: false })
                        }
                      >
                        Change
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        {initialUserData.firstname.length === 0
                          ? "No data"
                          : initialUserData.firstname}
                      </div>
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
                    <>
                      <Field
                        id="lastname"
                        name="lastname"
                        onBlur={() => {
                          setIsEditing({ ...isEditing, lastname: false });
                          setInitialUserData({
                            ...initialUserData,
                            lastname: event.target.value,
                          });
                        }}
                      />
                      <button
                        onClick={() =>
                          setIsEditing({ ...isEditing, lastname: false })
                        }
                      >
                        Change
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        {initialUserData.lastname.length === 0 ? (
                          <>{vide}</>
                        ) : (
                          initialUserData.lastname
                        )}
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
                      <div>
                        {initialUserData.genre.length === 0 ? (
                          <>{vide}</>
                        ) : (
                          initialUserData.genre
                        )}
                      </div>
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
                      <div>
                        {initialUserData.street.length === 0 ? (
                          <>{vide}</>
                        ) : (
                          initialUserData.street
                        )}
                      </div>
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
                      <div>
                        {initialUserData.city.length === 0 ? (
                          <>{vide}</>
                        ) : (
                          initialUserData.city
                        )}
                      </div>
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
                      <div>
                        {!initialUserData.zip ||
                        initialUserData.zip.toString().length === 0 ? (
                          <>{vide}</>
                        ) : (
                          initialUserData.zip
                        )}
                      </div>
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
                      <div>
                        {initialUserData.country.length === 0 ? (
                          <>{vide}</>
                        ) : (
                          initialUserData.country
                        )}
                      </div>
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
        </>
      ) : (
        <p>You must be logged in to access this page.</p>
      )}
    </>
  );
};

export default Profile;
