import { FormValidationVoter } from "../components/FormValidationVoter"
import { HeaderVoter } from "../components/HeaderVoter"

export const MainVoter = () => {
  return (
    <div>
      <HeaderVoter/>
      <div className="content-main-validation">
        <FormValidationVoter/>
      </div>
    </div>
  )
}
