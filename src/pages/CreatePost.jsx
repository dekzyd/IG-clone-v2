import "./CreatePost.css";
import { API, Auth, Storage, graphqlOperation } from "aws-amplify";
import { createPost } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { CollectionsRounded } from "@mui/icons-material";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", description: "", image: "" });
  const [photo, setPhoto] = useState("");
  const [updateProfile, setUpdateProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await Auth.currentAuthenticatedUser();
      const usersList = await API.graphql(graphqlOperation(listUsers));
      const currentUser = usersList.data.listUsers.items.filter(
        (item) => item.uniqueId === userDetails.attributes.sub
      );

      if (currentUser.length < 1) {
        setUpdateProfile(true);
        toast.warning("You need to update your Profile to continue");
      } else {
        setPost({ ...post, userPostsId: currentUser[0].id });
      }
    };
    fetchUser();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!(post.title || post.description || post.image)) {
      toast.info("Fill in some input");
      return;
    }
    try {
      await API.graphql(
        graphqlOperation(createPost, {
          input: {
            title: post.title,
            description: post.description,
            image: post.image,
            userPostsId: post.userPostsId,
          },
        })
      );

      toast.success("Added Post");
      setPost({
        title: "",
        description: "",
        image: "",
      });
      navigate("/");
    } catch (error) {
      toast.error("There was an error");
      console.log(error);
    }
    console.log(post);
  };

  const clearForm = () => {
    setPost({
      ...post,
      title: "",
      description: "",
      image: "",
    });
    toast.success("Form cleared.");
  };

  const handlePostChange = async (e) => {
    const image = e.target.files[0];

    try {
      //   upload post image to s3 bucket
      const id = toast.loading("Uploading...Pls wait");
      const file_ext = image.name.split(".")[1];
      const { key } = await Storage.put(`${Date.now()}.${file_ext}`, image, {
        contentType: `image/${file_ext}`,
      });
      toast.update(id, {
        render: "Uploaded successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setPost({ ...post, image: key });
      setPhoto(URL.createObjectURL(image));
    } catch (error) {
      toast.error("uploading failed");
      console.log(error);
    }
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
                Add Post
              </h3>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  {photo ? (
                    <img
                      className="inline-block h-20 w-20 mr-4 mb-2 rounded-md object-cover"
                      src={photo}
                      alt="post_image"
                    />
                  ) : (
                    <p className="mt-2 mb-6">Post will appear here</p>
                  )}
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <CollectionsRounded />
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handlePostChange}
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={post.title || "title"}
                        value={post.title}
                        onChange={(e) => {
                          setPost({ ...post, title: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={2}
                      className="block w-full outline-none pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={post.description || "description"}
                      value={post.description}
                      onChange={(e) => {
                        setPost({ ...post, description: e.target.value });
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Beautifully describe your post.
                  </p>
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
                Post
              </button>
            </div>
          </div>
        </form>
        {updateProfile && navigate("/settings")}
      </div>
    </section>
  );
};

export default CreatePost;
