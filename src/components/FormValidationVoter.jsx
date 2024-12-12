import { useController, useForm } from "react-hook-form";
import { Button, Card, InputText, Toast } from "../libs/prime-react"
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getStudentByKeyVoter } from "../db/indexedDBStudent";
import { showError, showWarn } from "../shared/message";
export const FormValidationVoter = () => {

    const toast = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const { control, handleSubmit } = useForm({ 
        mode:'onTouched',
        defaultValues:{
            keyVoter:'',
        }
    });

    const onSubmit = (data) => {

        setIsLoading(true);
        
        const keyVoter = String(data.keyVoter).toUpperCase();

        getStudentByKeyVoter(keyVoter).then(data => {
            
            if(data.length!=0){
                setIsLoading(false);
                const onlyOne = data.length>0?data[0]:null;
                navigate('/student-voter', { state:onlyOne, replace:true })
            }else{
                setTimeout(() => setIsLoading(false),1500);
                showWarn(toast,'Consulta de datos',`El estudiante con código ${keyVoter} no se encontró`)
            }

        }).catch( e => {
            setTimeout(() => setIsLoading(false),1000);
            showError(toast,'Consulta de datos', String(e))
        })

    };

    const KeyVoterField = () => {
        const { field, fieldState } = useController({
            name: "keyVoter",
            control,
            rules: { required: true, maxLength:6, minLength:6, pattern:/^\d{4}[a-zA-Z]{2}$/ },
        });
    
        return (
            <div className="flex flex-column w-full">
                <Toast ref={toast}/>
                <div className="p-inputgroup w-full mt-1">
                    <InputText 
                        value={field.value}
                        id='keyVoter'
                        type="text"
                        autoComplete="off"
                        maxLength={6}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
                    />

                    </div>
            </div>
        );
    };


  return (
    <div className="content-form-valid-voter">
        <form onSubmit={handleSubmit(onSubmit)} method="post">
            <Card>
                <label htmlFor="keyVoter" className="mb-2"><b>Ingrese tu código</b></label>
                <KeyVoterField/>
                <Button label="Acceder" 
                        className="w-full mt-2"
                        disabled={isLoading}
                        icon={isLoading?"pi pi-spin pi-spinner":""}
                        type="submit"/>
            </Card>
        </form>
    </div>
  )
}
