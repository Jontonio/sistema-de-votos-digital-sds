import { Card } from "../../libs/prime-react"
import { FormLogin } from "../components/FormLogin"

export const Login = () => {
  return (
    <div className="h-screen flex justify-content-center align-items-center">
      <Card className="w-4 h-24rem">
        <FormLogin /> 
      </Card>
    </div>
  )
}
