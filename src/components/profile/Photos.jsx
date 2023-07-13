import Skeleton from "react-loading-skeleton";
import { useState, useEffect } from "react";

import { listPosts } from "../../graphql/queries";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";

const photos = [];

const Photos = () => {
  const [usersPosts, setUsersPosts] = useState([]);
  const [view, setView] = useState("Post");
  const queryParams = window.location.href.split("/");

  useEffect(() => {
    const getPosts = async () => {
      const id = queryParams[queryParams.length - 1];
      const PostsArray = await API.graphql(graphqlOperation(listPosts));
      const usersPostArray = PostsArray.data.listPosts.items.filter((post) => {
        return post.owner.id === id;
      });
      setUsersPosts(usersPostArray);
    };
    getPosts();
  }, []);

  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4 px-10 ">
      <div className="flex justify-center gap-x-3">
        <button
          className={view === "Post" ? "text-blue-500 font-semibold" : ""}
          onClick={() => {
            setView("Post");
          }}
        >
          Posts
        </button>
        <button
          className={view === "Saved" ? "text-blue-500 font-semibold" : ""}
          onClick={() => {
            setView("Saved");
          }}
        >
          Saved
        </button>
        <button
          className={view === "Tagged" ? "text-blue-500 font-semibold" : ""}
          onClick={() => {
            setView("Tagged");
          }}
        >
          Tagged
        </button>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12 pb-8">
        {view === "Post" && (
          <div className="my-post">
            <div className="posts">
              {usersPosts.length ? (
                usersPosts.map((post) => {
                  console.log(post);
                  return (
                    <div key={post.id}>
                      <PhotoCard data={post} />
                    </div>
                  );
                })
              ) : (
                <h1>No post yet</h1>
              )}
            </div>
          </div>
        )}
        {/* {view === "Saved" && (
          <div className="saved-post">
            <div className="saved">
              {!user.savedPost === null ? (
                user.post.map((eachPost) => {
                  return { */}
        {/* <ProfileCard img={Post4} like = {eachPost.likes.length} comment ={eachPost.comment.length}/> */}
        {/* };
                })
              ) : (
                <h1>No savedPost yet</h1>
              )}
            </div>
          </div>
        )}
        {view === "Tagged" && (
          <div className="tagged-post">
            <div className="tagged">
              {!user.taggedPost === null ? (
                user.taggedPost.map((eachPost) => {
                  return { */}
        {/* <ProfileCard img={Post4} like = {eachPost.likes.length} comment = {eachPost.comment.length}/> */}
        {/* };
                })
              ) : (
                <h1>No tagged Post</h1>
              )}
            </div>
          </div>
        )} */}

        {/* {!photos
          ? new Array(12)
              .fill(0)
              .map((_, i) => <Skeleton key={i} width={320} height={400} />)
          : photos.length > 0
          ? photos.map((photo, index) => (
              <div key={`${photo.docId}${index}`} className="relative group">
                <img
                  src={photo.imageSrc}
                  alt={photo.caption}
                  className="h-60 w-full object-cover"
                />

                <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
          : null} */}
      </div>

      {/* {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))} */}
    </div>
  );
};

export default Photos;
