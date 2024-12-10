import { Message, Card} from "../libs/prime-react"

export const MessageCard = ({ message }) => {

  return (
    
    <Card className="text-center w-full">
        <h2>{message}</h2>
    </Card>
  )
}
