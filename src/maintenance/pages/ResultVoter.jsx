import { Card } from "primereact/card";
import { BarChart } from "../components/BarChart";
import { getVotes } from "../../db/indexedDBVoter";
import { getCandidates } from "../../db/indexedDBCandidate";
import { useEffect, useState } from "react";
const transformToPoints = (data, totalVotes) => {

  return data.map((item, i) => ({
    x: `${item.nombres} ${item.apellidos}`,  
    y: totalVotes[i] - 1,  
    image: {
      path: item.logo,  
      width: 30,  
      height: 30,  
      offsetY: -30  
    }
  }));
};

const countVotes = (candidates, votes) => {
  return candidates.map(item => {
    const count = votes.filter(record => record.candidateDNI === item.dni).length;

    return count
  });
}

export const ResultVoter = () => {

  const [categories, setCategories] = useState([]);
  const [dataVotes, setDataVotes] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    Promise.all([getVotes(), getCandidates()])
      .then(([vots, cands]) => {

        const arrVotes = countVotes(cands, vots);
        const categories = cands.map(cand => `${cand.nombres} ${cand.apellidos}`);
        const newPoints = transformToPoints(cands, arrVotes);

        setDataVotes(arrVotes);
        setPoints(newPoints);
        setCategories(categories);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Card title="Resultado de eleciones">
        <BarChart categories={categories} points={points} dataVotes={dataVotes}/>
      </Card>
    </div>
  );
}
