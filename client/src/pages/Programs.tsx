import axios from "axios";
import { useEffect, useState } from "react";

export default function Programs() {
  interface ProgramTypes {
    id: number;
    title: string;
    synopsis: string;
    poster: string;
    country: string;
    year: number;
  }
  const [programs, setPrograms] = useState([] as ProgramTypes[]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => setPrograms(response.data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données", error);
      });
  });
  return (
    <>
      <div className="programs-container">
        <h1>Liste séries </h1>
        <div className="programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <img
                src={program.poster}
                alt={`Affiche de ${program.title}`}
                className="program-poster"
              />
              <h2 className="program-title">{program.title}</h2>
              <p className="program-synopsis">
                <strong>Synopsis :</strong> {program.synopsis}
              </p>
              <p className="program-country">
                <strong>Pays :</strong> {program.country}
              </p>
              <p className="program-year">
                <strong>Année :</strong> {program.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
