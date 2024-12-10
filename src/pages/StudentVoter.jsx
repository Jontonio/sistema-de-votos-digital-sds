import { useEffect, useState } from "react";
import { CardCandidate } from "../components/CardCandidate";
import { HeaderVoter } from "../components/HeaderVoter";
import { getCandidates } from "../db/indexedDBCandidate";
import { MessageCard } from "../shared/MessageCard";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
export const StudentVoter = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state; 
  
  const [listCandidate, setListCandidate] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    if(!data){
      navigate("/form-voter");
    }
  },[data, navigate])
  
  useEffect(() => {

    getCandidates().then(list => {
      setListCandidate(list);
    }).catch(e => {
      console.log(e)
    })
    
  },[])

  return (
    <>
      { data?
        <div>
            <HeaderVoter/>
            {listCandidate.length==0?<MessageCard message={'Lista de candidatos vacía'}/>:''}
            <div className="container-list-candidate">
              { listCandidate.map( item => {
                return <CardCandidate key={item.dni} 
                                      candidate={item}
                                      selectedCandidate={selectedCandidate}
                                      currentUser={data}
                                      setSelectedCandidate={setSelectedCandidate}/>
              }) }
            </div>
        </div>
      :""}
    </>
  )
}
