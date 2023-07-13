/* eslint-disable react/prop-types */
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listComments, listLikes } from "../../graphql/queries";
import { useState, useEffect } from "react";

const PhotoCard = ({ data }) => {
  const [image, setImage] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedImage = await Storage.get(data.image, { expires: 60 });
      setImage(fetchedImage);

      const fetchedComments = await API.graphql(graphqlOperation(listComments));
      const postComments = fetchedComments.data.listComments.items.filter(
        (comment) => {
          return comment.post.id === data.id;
        }
      );
      setComments(postComments);

      const fetchedLikes = await API.graphql(graphqlOperation(listLikes));
      const postLikes = fetchedLikes.data.listLikes.items.filter(
        (each_like) => {
          return each_like.post.id === data.id;
        }
      );
      setLikes(postLikes);
    };
    fetchData();
  }, []);

  return (
    <div>
      <img
        className="h-64 w-96 object-cover rounded-sm"
        src={image}
        alt={data.title}
      />
    </div>
  );
};

export default PhotoCard;
