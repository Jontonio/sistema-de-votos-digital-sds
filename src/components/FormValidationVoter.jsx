import { useController, useForm } from "react-hook-form";
import { Button, Card, InputText } from "../libs/prime-react"
import { useState } from "react";
import { useNavigate } from "react-router";

export const FormValidationVoter = () => {

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const { control, handleSubmit } = useForm({ 
        mode:'onTouched',
        defaultValues:{
            key_voter:'',
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(data)
            setIsLoading(false);
            navigate('/student-voter')
        }, 500);
    };

    const KeyVoterField = () => {
        const { field, fieldState } = useController({
            name: "key_voter",
            control,
            rules: { required: true, maxLength:5, minLength:5 },
        });
    
        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mt-1">
                    <InputText 
                        value={field.value}
                        id='key_voter'
                        type="text"
                        autoComplete="off"
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
                <label htmlFor="">Ingrese tu código</label>
                <KeyVoterField/>
                <Button label="Acceder" 
                        className="w-full mt-1"
                        disabled={isLoading}
                        icon={isLoading?"pi pi-spin pi-spinner":""}
                        type="submit"/>
            </Card>
        </form>
    </div>
  )
}
