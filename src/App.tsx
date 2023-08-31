import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "./Apollo/Queries/getData";
// import "../src/index.css";

function App() {
  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState<string>("");
  const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_DATA(submittedSearch), {
    skip: !shouldFetchData,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedSearch(search);
    setShouldFetchData(true);
  };

  return (
    <section>
      <div className="container">
        <h1>Ricky and Morty</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={({ currentTarget }) => setSearch(currentTarget.value)}
            placeholder="Ex: Ricky"
          />
          <button type="submit">Search</button>
        </form>
        {/* Mostrar resultados da consulta aqui */}
        {loading ? <p>Carregando...</p> : null}
        {error ? <p>Error: {error.message}</p> : null}
        <div className="container">
          {data &&
            data.characters.results.map(
              (item: { name: string; image: string; id: string }) => {
                return (
                  <div key={item.id}>
                    <img src={item.image} />
                    <p>{item.name}</p>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </section>
  );
}

export default App;
