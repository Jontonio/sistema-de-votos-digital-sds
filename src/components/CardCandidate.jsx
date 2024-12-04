import { Card } from "../libs/prime-react"

export const CardCandidate = ({ candidate }) => {
  return (
        <Card className="mt-1">
            <div className="container-main-candidate">
                <div className="container-name-candidate">
                <h2>{`${candidate.names} ${candidate.firstName} ${candidate.lastName}`.toUpperCase()}</h2>
                </div>
                <div className="container-main-img-candidate">
                <div className="candidate-container">
                    <img className="candidate-img" src={candidate.sloganCandidate} alt="" />
                </div>
                <div className="candidate-container">
                    <img className="candidate-img" src={candidate.pictureCandidate} alt="" />
                </div>
                </div>
            </div>
        </Card>
  )
}
