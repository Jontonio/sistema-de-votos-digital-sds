import { useForm, useController } from 'react-hook-form';
import { Card, Dropdown, Button, InputText, Toast } from '../../libs/prime-react';
import { grades, sections } from "../../shared/data";
import { addStudent } from "../../db/indexedDBStudent";
import { useRef } from 'react';
import { showError, showSuccess } from "../../shared/message";

export const FormStudent = () => {

    const toast = useRef(null);
    const keyVoterFuntion = (dni, apellidos) => {
        const lastDigits = String(dni).slice(-4)
        let lastCharts = String(apellidos).slice(-2).toUpperCase(); 
        const code_voter = `${lastDigits}${lastCharts}`
        return code_voter.toUpperCase();
    }

    const { control, handleSubmit, reset } = useForm({
        mode: 'onTouched',
        defaultValues: {
            dni: '',
            nombres: '',
            apellidos: '',
            grado: '',
            seccion: '',
        }
    });

    const onSubmit = async (data) => {

        data.nombres = String(data.nombres).toUpperCase()
        data.apellidos = String(data.apellidos).toUpperCase()

        const student = {...data, status: true, keyVoter: keyVoterFuntion(data.dni, data.apellidos)};
        addStudent(student).then( res => {
            reset();
            showSuccess(toast, "Registro de estudiante",`El estudiante con dni ${res} registrado correctamente`)
        }).catch( e => {
            console.log(e)
            showError(toast, "Error al registrar", String(e)) 
        })
    };

    // Componente para el campo "dni"
    const DniField = () => {
        const { field, fieldState } = useController({
            name: "dni",
            control,
            rules: { required: "El DNI es obligatorio", maxLength: 8, minLength: 8 },
        });

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                    <InputText 
                        value={field.value}
                        id="dni"
                        type="text"
                        maxLength={8}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
                    />
                </div>
            </div>
        );
    };

    // Componente para el campo "nombres"
    const NombresField = () => {
        const { field, fieldState } = useController({
            name: "nombres",
            control,
            rules: { required: "El nombre es obligatorio" },
        });

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                    <InputText 
                        value={field.value}
                        id="nombres"
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
                    />
                </div>
            </div>
        );
    };

    // Componente para el campo "apellidos"
    const ApellidosField = () => {
        const { field, fieldState } = useController({
            name: "apellidos",
            control,
            rules: { required: "El apellido es obligatorio" },
        });

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                    <InputText 
                        value={field.value}
                        id="apellidos"
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
                    />
                </div>
            </div>
        );
    };

    // Componente para el campo "grado"
    const GradoField = () => {
        const { field, fieldState } = useController({
            name: "grado",
            control,
            rules: { required: "El grado es obligatorio" },
        });

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                <Dropdown
                        value={field.value}
                        options={grades}
                        optionLabel="label"
                        onChange={(e) => field.onChange(e.value)}
                        onBlur={field.onBlur}
                        placeholder="Elija el grado"
                        className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
                    />
                </div>
            </div>
        );
    };

    // Componente para el campo "seccion"
    const SeccionField = () => {
        const { field, fieldState } = useController({
            name: "seccion",
            control,
            rules: { required: "La sección es obligatoria" },
        });

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                    <Dropdown
                        value={field.value}
                        options={sections}
                        optionLabel="label"
                        onChange={(e) => field.onChange(e.value)}
                        onBlur={field.onBlur}
                        placeholder="Elija la sección"
                        className={fieldState.error ? 'p-invalid w-full' : 'w-full'}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast}/>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
                <Card>
                    <label htmlFor="dni">DNI</label>
                    <DniField control={control} />

                    <label htmlFor="nombres">Nombres</label>
                    <NombresField control={control} />

                    <label htmlFor="apellidos">Apellidos</label>
                    <ApellidosField control={control} />

                    <label htmlFor="grado">Grado</label>
                    <GradoField control={control} />

                    <label htmlFor="seccion">Sección</label>
                    <SeccionField control={control} />

                    <Button
                        label="Registrar"
                        className=" mb-2 mt-2"
                        outlined
                        type="submit"
                    />
                </Card>
            </form>
        </div>
    );
};
