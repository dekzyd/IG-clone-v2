import { useEffect, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import "./Suggestions.css";

import { listUsers } from "../../../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";

const Suggestions = () => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await API.graphql(graphqlOperation(listUsers));
        const list = usersList.data.listUsers.items;
        setUsers(list);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="suggestions">
      <div className="suggestions__title">Suggestions for you</div>
      <div className="suggestions__usernames">
        {users.map((user, index) => {
          return <SuggestionCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Suggestions;
