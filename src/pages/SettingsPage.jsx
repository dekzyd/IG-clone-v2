import "./settingsPage.css";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { API, Auth, Storage, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createUser, updateUser } from "../graphql/mutations";

import { toast } from "react-toastify";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    uniqueId: "",
    username: "",
    bio: "",
    website: "",
    phone: "",
    gender: "",
    avatar: "",
  });

  const [freshUser, setFreshUser] = useState(false);

  const [userAvatar, setUserAvatar] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await Auth.currentAuthenticatedUser();
      console.log(userDetails);
      const usersList = await API.graphql(graphqlOperation(listUsers));
      const currentUser = usersList.data.listUsers.items.filter(
        (item) => item.uniqueId === userDetails.attributes.sub
      );

      if (currentUser.length < 1) {
        setFreshUser(true);
        toast.warning("You need to update your Profile");
        setUser({ ...user, uniqueId: userDetails.attributes.sub });
      } else {
        setUser(currentUser[0]);

        const profile_avatar = await Storage.get(currentUser[0].avatar, {
          expires: 60,
        });
        setUserAvatar(profile_avatar);
      }
    };
    fetchUser();
  }, []);

  const updateAvatar = async (e) => {
    const image = e.target.files[0];

    try {
      //   upload user image avatar to s3 bucket
      const file_ext = image.name.split(".")[1];
      const { key } = await Storage.put(`${Date.now()}.${file_ext}`, image, {
        contentType: `image/${file_ext}`,
      });
      console.log("image uploaded to s3 bucket");
      setUser({ ...user, avatar: key });
      setUserAvatar(URL.createObjectURL(image));
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (
      !(
        user.name ||
        user.username ||
        user.bio ||
        user.website ||
        user.gender ||
        user.avatar ||
        user.phone
      )
    )
      return;

    try {
      // ---------create new user-------------------
      if (freshUser) {
        await API.graphql(graphqlOperation(createUser, { input: user }));
        toast.success("Profile Created");
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      } else {
        // --------- update existing user -----------

        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.id,
              name: user.name && user.name,
              username: user.username && user.username,
              bio: user.bio && user.bio,
              website: user.website && user.website,
              gender: user.gender && user.gender,
              phone: user.phone && user.phone,
              avatar: user.avatar && user.avatar,
            },
          })
        );
        toast.success("Profile Updated");
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }

    console.log(user);
  };

  const clearForm = () => {
    setUser({
      ...user,
      name: "",
      username: "",
      bio: "",
      website: "",
      phone: "",
      gender: "",
    });
    toast.success("Form cleared.");
  };

  return (
    <section>
      <div className="container__box">
        <button className="bg-indigo-600 px-2 py-1 mb-3 rounded-md text-white">
          <Link to="/">Back Home</Link>
        </button>
        <form className="form" onSubmit={formSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Update Profile
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <img
                    className="inline-block h-20 w-20 mr-4 mb-2 rounded-md object-cover"
                    src={userAvatar}
                    alt="avatar"
                  />
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Avatar
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={updateAvatar}
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="username"
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.name || "name"}
                        value={user.name}
                        onChange={(e) => {
                          setUser({ ...user, name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.username || "username"}
                        value={user.username}
                        onChange={(e) => {
                          setUser({ ...user, username: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={2}
                      className="block w-full outline-none pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={user.bio || "Bio"}
                      value={user.bio}
                      onChange={(e) => {
                        setUser({ ...user, bio: e.target.value });
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Website
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="website"
                        id="website"
                        autoComplete="website"
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.website || "website"}
                        value={user.website}
                        onChange={(e) => {
                          setUser({ ...user, website: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.phone || "012-234-5678"}
                        value={user.phone}
                        onChange={(e) => {
                          setUser({ ...user, phone: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="gender"
                        id="gender"
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={user.gender || "gender"}
                        value={user.gender}
                        onChange={(e) => {
                          setUser({ ...user, gender: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={clearForm}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SettingsPage;
