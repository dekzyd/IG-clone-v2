/* eslint-disable react/prop-types */
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { listPosts, listUsers, listFollows } from "../../graphql/queries";
import { createFollow, deleteFollow } from "../../graphql/mutations";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";

const Header = () => {
  const [profPageOwner, setProfPageOwner] = useState({});
  const [usersPosts, setUsersPosts] = useState([]);
  const [user, setUser] = useState({});
  const [profFollowers, setProfFollowers] = useState("");
  const [profFollowings, setProfFollowings] = useState("");
  const [profPix, setProfPix] = useState("");
  const [holder, setHolder] = useState(false);
  const [followingProf, setFollowingProf] = useState("");
  const queryParams = window.location.href.split("/");

  useEffect(() => {
    const fetchUser = async () => {
      const id = queryParams[queryParams.length - 1];
      // console.log(id);

      const nowUser = await Auth.currentAuthenticatedUser();
      const usersArray = await API.graphql(graphqlOperation(listUsers));
      const currUser = usersArray.data.listUsers.items.filter((user) => {
        return user.uniqueId === nowUser.attributes.sub;
      });
      setUser(currUser[0]);

      const PostsArray = await API.graphql(graphqlOperation(listPosts));
      const usersPostArray = PostsArray.data.listPosts.items.filter((post) => {
        return post.owner.id === id;
      });
      setUsersPosts(usersPostArray);

      const profileOwner = usersArray.data.listUsers.items.filter((user) => {
        return user.id === id;
      });
      setProfPageOwner(profileOwner[0]);

      const fetchFollowers = await API.graphql(graphqlOperation(listFollows));
      const profileFollowers = fetchFollowers.data.listFollows.items.filter(
        (follow) => {
          return follow.starId === id;
        }
      );
      setProfFollowers(profileFollowers);

      const fetchFollowings = fetchFollowers.data.listFollows.items.filter(
        (each_follow) => {
          return each_follow.admirerId === id;
        }
      );
      setProfFollowings(fetchFollowings);

      const profileImage = await Storage.get(profileOwner[0].avatar, {
        expires: 60,
      });
      setProfPix(profileImage);

      if (profileOwner[0].id === currUser[0].id) {
        setHolder(true);
      }

      console.log(profFollowers);
      for (let i = 0; i < profFollowers.length; i++) {
        if (profFollowers[i].admirerId === user.id) {
          setFollowingProf(true);
          return;
        }
      }
    };

    fetchUser();
  }, [followingProf]);

  const followProfile = async () => {
    try {
      await API.graphql(
        graphqlOperation(createFollow, {
          input: {
            admirerId: user.id,
            starId: profPageOwner.id,
          },
        })
      );
      toast.success(`Now following ${profPageOwner.username}`);
      setFollowingProf(true);
    } catch (error) {
      toast.error("error following");
      console.log(error);
    }
  };

  const unFollowProfile = async () => {
    for (let i = 0; i < profFollowers.length; i++) {
      if (profFollowers[i].admirerId === user.id) {
        //unfollow user
        try {
          await API.graphql(
            graphqlOperation(deleteFollow, {
              input: {
                id: profFollowers[i].id,
              },
            })
          );
          toast.success(`Unfollowed ${profPageOwner.username}`);
          setFollowingProf(false);
          return;
        } catch (error) {
          toast.error("error Unfollowing");
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <button className="bg-indigo-600 px-2 py-1 rounded-md text-white absolute left-10">
        <Link to="/">Back Home</Link>
      </button>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto  mt-6 max-w-screen-lg">
        <div className="container flex justify-center items-center">
          <img
            className="rounded-full h-40 w-40 flex object-cover"
            alt={` profile picture`}
            src={profPix}
          />
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4">{profPageOwner.username}</p>

            {holder ? (
              <Link to="/settings">
                <button className="bg-indigo-600 px-2 py-1 items-center rounded-md text-white">
                  Edit profile
                </button>
              </Link>
            ) : (
              <div>
                {!followingProf ? (
                  <button
                    className="bg-indigo-600 px-2 py-1 items-center rounded-md text-white"
                    type="button"
                    onClick={unFollowProfile}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="bg-indigo-600 px-2 py-1 items-center rounded-md text-white"
                    type="button"
                    onClick={followProfile}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="container flex mt-4">
            <>
              <p className="mr-10">
                <span className="font-bold">{usersPosts.length}</span>{" "}
                {usersPosts.length === 1 ? "photo" : "photos"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profFollowers.length}</span>
                {` `}
                {profFollowers.length === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profFollowings.length}</span>{" "}
                following
              </p>
            </>
          </div>
          <div className="container mt-4">
            <p className="font-medium">{profPageOwner.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
