import { useState } from "react";
import PokemonFilter from "../pokemonFilter/";
import "./appHeader.css";

export const AppHeader = () => {
  const [filter, setFilte] = useState("all");

  const onFilterSelect = (filter) => {
    if (filter === "all") {
      setFilte(filter);
    } else {
      setFilte(filter);
    }
  };

  return (
    <div className="header">
      <PokemonFilter filter={filter} onFilterSelect={onFilterSelect} />
    </div>
  );
};
