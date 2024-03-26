import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserState } from "../../store/reducers/reducerConnection";

interface ProfileValues {
  firstname: string;
  lastname: string;
  genre: string;
  street: string;
  city: string;
  zip: number;
  country: string;
}

const Profile = () => {
  const { user } = useSelector((state: { user: UserState }) => state.user);

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
      .matches(/^[a-zA-Zéèêôï]+$/, "Must contain only letters"),
    lastname: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Zéèêôï]+$/, "Must contain only letters"),
    genre: Yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender"),
    street: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, "Invalid address"),
    city: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Zéèêôï\s]{3,}$/, "Invalid city"),
    zip: Yup.string()
      .max(10, "Maximum 10 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[0-9]{5}$/, "Invalid postal code"),
    country: Yup.string()
      .max(50, "Maximum 50 characters")
      .min(2, "Minimum 2 characters")
      .matches(/^[a-zA-Zéèêôï\s]{3,}$/, "Invalid country"),
  });
  const submitForm = async ({
    setSubmitting,
  }: FormikHelpers<ProfileValues>) => {
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
  const classnameInput =
    "bg-stone-700 rounded-lg focus-within:outline-yellow-400";

  return (
    <>
      {user ? (
        <>
          <Formik
            initialValues={initialUserData}
            validationSchema={ProfileSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting, errors, touched }) => (
              <>
                <Form className="grid grid-cols-4 gap-x-8">
                  <label htmlFor="firstname">Firstname</label>
                  {isEditing.firstname ? (
                    <>
                      <Field
                        id="firstname"
                        name="firstname"
                        className={classnameInput}
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                          setIsEditing({ ...isEditing, firstname: false });
                          setInitialUserData({
                            ...initialUserData,
                            firstname: event.target ? event.target.value : "",
                          });
                        }}
                      />
                      <button
                        type="button"
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, firstname: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  {errors.firstname && touched.firstname ? (
                    <p className="text-red-500 left-1">{errors.firstname}</p>
                  ) : initialUserData.firstname.length === 0 ? (
                    <p>{errors.firstname}</p>
                  ) : (
                    <div className="text-green-500">V</div>
                  )}
                  <label htmlFor="lastname">Lastname</label>
                  {isEditing.lastname ? (
                    <>
                      <Field
                        id="lastname"
                        name="lastname"
                        className={classnameInput}
                        onBlur={() => {
                          setIsEditing({ ...isEditing, lastname: false });
                          setInitialUserData({
                            ...initialUserData,
                            lastname: event.target.value,
                          });
                        }}
                      />
                      <button
                        type="button"
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, lastname: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  {errors.lastname && touched.lastname ? (
                    <p className="text-red-500 left-1">{errors.lastname}</p>
                  ) : initialUserData.lastname.length === 0 ? (
                    <p>{errors.lastname}</p>
                  ) : (
                    <div className="text-green-500">V</div>
                  )}
                  <label htmlFor="genre">Genre</label>
                  {isEditing.genre ? (
                    <>
                      <Field
                        as="select"
                        id="genre"
                        className={classnameInput}
                        name="genre"
                        onBlur={() => {
                          setIsEditing({ ...isEditing, genre: false });
                          setInitialUserData({
                            ...initialUserData,
                            genre: event.target.value,
                          });
                        }}
                      >
                        <option value="">Sélectionnez un genre</option>
                        <option value="Male">Homme</option>
                        <option value="Female">Femme</option>
                        <option value="Other">Autre</option>
                      </Field>
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, genre: false })
                        }
                      >
                        Change
                      </button>
                    </>
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, genre: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  {errors.genre && touched.genre ? (
                    <p className="text-red-500 left-1">{errors.genre}</p>
                  ) : initialUserData.genre.length === 0 ? (
                    <p>{errors.genre}</p>
                  ) : (
                    <div className="text-green-500">V</div>
                  )}
                  <label htmlFor="street">Adresse</label>
                  {isEditing.street ? (
                    <>
                      <Field
                        id="street"
                        name="street"
                        className={classnameInput}
                        onBlur={() => {
                          setIsEditing({ ...isEditing, street: false });
                          setInitialUserData({
                            ...initialUserData,
                            street: event.target.value,
                          });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, street: false })
                        }
                      >
                        Change
                      </button>
                    </>
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, street: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  {errors.street && touched.street ? (
                    <p className="text-red-500 left-1">{errors.street}</p>
                  ) : initialUserData.street.length === 0 ? (
                    <p>{errors.street}</p>
                  ) : (
                    <div className="text-green-500">V</div>
                  )}
                  <label htmlFor="city">City</label>
                  {isEditing.city ? (
                    <>
                      <Field
                        id="city"
                        name="city"
                        className={classnameInput}
                        onBlur={() => {
                          setIsEditing({ ...isEditing, city: false });
                          setInitialUserData({
                            ...initialUserData,
                            city: event.target.value,
                          });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, city: false })
                        }
                      >
                        Change
                      </button>
                    </>
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, city: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  {errors.city && touched.city ? (
                    <p className="text-red-500 left-1">{errors.city}</p>
                  ) : initialUserData.city.length === 0 ? (
                    <p>{errors.city}</p>
                  ) : (
                    <div className="text-green-500">V</div>
                  )}

                  <label htmlFor="zip">Zip code</label>
                  {isEditing.zip ? (
                    <>
                      <Field
                        id="zip"
                        name="zip"
                        className={classnameInput}
                        inputMode="numeric"
                        onBlur={() => {
                          setIsEditing({ ...isEditing, zip: false });
                          setInitialUserData({
                            ...initialUserData,
                            zip: event.target.value,
                          });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, zip: false })
                        }
                      >
                        Change
                      </button>
                    </>
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, zip: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}

                  {errors.zip && touched.zip ? (
                    <p className="text-red-500 left-1">{errors.zip}</p>
                  ) : initialUserData.zip.toString().length === 0 ? (
                    <p></p>
                  ) : (
                    <div className="text-green-500">V</div>
                  )}

                  <label htmlFor="country">Country</label>
                  {isEditing.country ? (
                    <>
                      <Field
                        id="country"
                        name="country"
                        className={classnameInput}
                        onBlur={() => {
                          setIsEditing({ ...isEditing, country: false });
                          setInitialUserData({
                            ...initialUserData,
                            country: event.target.value,
                          });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, country: false })
                        }
                      >
                        Change
                      </button>
                    </>
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
                        type="button"
                        onClick={() =>
                          setIsEditing({ ...isEditing, country: true })
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                  {errors.country && touched.country ? (
                    <p className="text-red-500 left-1">{errors.country}</p>
                  ) : initialUserData.country.length === 0 ? (
                    <p>{errors.country}</p>
                  ) : (
                    <div className="text-green-500">V</div>
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
