import { useEffect, useState } from "react"
import { CardCandidate } from "../components/CardCandidate"
import { HeaderVoter } from "../components/HeaderVoter"

export const StudentVoter = () => {

  const [listCandidate, setListCandidate] = useState([])
  
  useEffect(() => {

    setListCandidate([
      {
        id:"1",
        names:"Raquel",
        firstName:"Rojas",
        lastName:"Rojas",
        sloganCandidate:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQeJs62Qmtiqw_BuyjlwVh2V8uYl-_aQoqXg&s",
        pictureCandidate:"https://i.pinimg.com/474x/25/c8/69/25c86979ece2bd51d4d6f5f579d3d5f2.jpg",
      },
      {
        id:"2",
        names:"Mario David",
        firstName:"Ninahuillca",
        lastName:"Romero",
        sloganCandidate:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYEbwseUpwTqITP5cDIJvKutPEroEwHXlZQw&s",
        pictureCandidate:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Foto_carnet_12_a%C3%B1os.jpg/640px-Foto_carnet_12_a%C3%B1os.jpg",
      }
    ])
    
  },[])

  return (
    <div>
        <HeaderVoter/>
        <div className="container-list-candidate">
          { listCandidate.map( item => {
            return <CardCandidate key={item.id} candidate={item}/>
          }) }
        </div>
    </div>
  )
}
