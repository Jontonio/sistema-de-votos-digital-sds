import { Card, Toast } from "../libs/prime-react"
import aspa from "../assets/imgs/x.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerVote } from "../db/indexedDBVoter"
import { showSuccess, showWarn } from "../shared/message";

const lifeToast = 2000;

export const CardCandidate = ({ candidate, setSelectedCandidate, selectedCandidate, currentUser}) => {
  
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);

    const candidateSelect = () => {

        if(selectedCandidate){
            return;
        }

        if(!selectedCandidate){
            setSelectedCandidate(candidate);
            setIsClicked(true);
        }

        const dataVoter = {
            voterDNI: currentUser.dni,
            date: new Date(),
            candidateDNI: candidate.dni
        }

        registerVote(dataVoter).then(() => {
            showSuccess(toast,"Elecciones escolares","Su voto fue registrado correctamente")
            setTimeout(() => navigate('/', { replace:true }), lifeToast);
        }).catch(e => {
            setTimeout(() =>navigate('/', { replace:true }), lifeToast);
            showWarn(toast, "Registro de votos", String(e))
        })
        
        
    }

    return (
            <Card className={isClicked?"mt-1 card-candidate-select":"mt-1 card-candidate"} onClick={candidateSelect}>
                <Toast ref={toast} position="center" />
                <div className="container-main-candidate">
                    <div className="container-name-candidate">
                        <h2>{`${candidate.nombres} ${candidate.apellidos}`.toUpperCase()}</h2>
                    </div>
                    <div className="container-main-img-candidate">
                    <div className="candidate-container">
                        {(selectedCandidate && (selectedCandidate.dni==candidate.dni)) && <img className="candidate-aspa" src={aspa} alt="" />}
                        <img className="candidate-img" src={candidate.logo} alt="" />
                    </div>
                    <div className="candidate-container">
                        {(selectedCandidate && (selectedCandidate.dni==candidate.dni)) && <img className="candidate-aspa" src={aspa} alt="" />}
                        <img className="candidate-img" src={candidate.photo} alt="" />
                    </div>
                    </div>
                </div>
            </Card>
    )
}
