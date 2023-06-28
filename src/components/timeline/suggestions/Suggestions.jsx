import SuggestionCard from "./SuggestionCard";
import "./Suggestions.css";

const Suggestions = () => {
  return (
    <div className="suggestions">
      <div className="suggestions__title">Suggestions for you</div>
      <div className="suggestions__usernames">
        <SuggestionCard />
        <SuggestionCard />
      </div>
    </div>
  );
};

export default Suggestions;
