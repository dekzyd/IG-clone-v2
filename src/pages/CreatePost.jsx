import "./CreatePost.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// import { CollectionsRounded } from "@mui/icons-material";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", description: "", image: "" });

  const formSubmit = () => {};

  const clearForm = () => {
    setPost({
      ...post,
      title: "",
      description: "",
      image: "",
    });
  };
  return (
    <section>
      <ToastContainer></ToastContainer>

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
                  <img
                    className="inline-block h-20 w-20 mr-4 mb-2 rounded-md object-cover"
                    // src={userAvatar}
                    alt="post_image"
                  />
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {/* <CollectionsRounded /> */}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        // onChange={updateAvatar}
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
      </div>
    </section>
  );
};

export default CreatePost;
