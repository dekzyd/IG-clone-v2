import { useEffect, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import "./Suggestions.css";

import { listUsers } from "../../../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        const suggestionList = await API.graphql(graphqlOperation(listUsers));
        const list = suggestionList.data.listUsers.items.filter((each_item) => {
          return each_item.uniqueId !== user.attributes.sub;
        });
        console.log(list);
        setSuggestions(list);
      } catch (error) {
        console.log(error);
      }
    };

    getSuggestions();
  }, []);

  if (!suggestions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="suggestions">
      <div className="suggestions__title">Suggestions for you</div>
      <div className="suggestions__usernames">
        {suggestions.map((user) => {
          return <SuggestionCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Suggestions;
