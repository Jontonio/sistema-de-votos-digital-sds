import { useForm, useController } from 'react-hook-form';
import { FileUpload, Card, Dropdown, Button, InputText, Toast} from '../../libs/prime-react';
import { grades, sections } from "../../shared/data";
import { useRef, useState } from 'react';
import { showError, showSuccess, showWarn } from '../../shared/message';

import { addCandidate } from "../../db/indexedDBCandidate"
export const FormCandidate = () => {

    const toast = useRef(null);

    const [chooseLogo, setChooseLogo] = useState(null);
    const [choosePhoto, setChoosePhoto] = useState(null);

    const { control, handleSubmit, setValue, reset } = useForm({
        mode: 'onTouched',
        defaultValues: {
            dni: '',
            nombres: '',
            apellidos: '',
            grado: '',
            seccion: '',
            photo:'',
            logo:''
        }
    });


    const onSubmit = (data) => {

        if(!chooseLogo || !choosePhoto){
            showWarn(toast, "Error de validación de datos","Selecione el logo y la foto del candidato")
            return;
        }

        if(!chooseLogo){
            showWarn(toast, "Error de validación de datos","Selecione el logo del candidato")
            return;
        }

        if(!choosePhoto){
            showWarn(toast, "Error de validación de datos","Selecione la foto del candidato")
            return;
        }

        addCandidate(data).then( res => {
            reset();
            setChooseLogo(null);
            setChoosePhoto(null);
            showSuccess(toast, "Registro de candidato",`Candidato con dni ${res} registrado correctamente`)
        }).catch( e => {
            showError(toast, "Error", String(e))
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

    const PhotoField = () => {

        const customBase64Uploader = async (event) => {
            // convert file to base64 encoded
            const file = event.files[0];
            const reader = new FileReader();
            let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    
            reader.readAsDataURL(blob);
    
            reader.onloadend = function () {
                const base64data = reader.result;
                setChoosePhoto(base64data);
                setValue('photo', base64data)
            };
        };

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                    <FileUpload mode="basic" 
                                name="photo" 
                                auto
                                chooseLabel="Selecciona"
                                accept="image/*" customUpload uploadHandler={customBase64Uploader} />
                </div>
            </div>
        );
    };

    const LogoField = () => {

        const customBase64Uploader = async (event) => {
            // convert file to base64 encoded
            const file = event.files[0];
            const reader = new FileReader();
            let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    
            reader.readAsDataURL(blob);
    
            reader.onloadend = function () {
                const base64data = reader.result;
                setChooseLogo(base64data)
                setValue('logo', base64data)
            };
        };

        return (
            <div className="flex flex-column w-full">
                <div className="p-inputgroup w-full mb-2">
                    <FileUpload mode="basic" 
                                name="logo"
                                chooseLabel="Selecciona"
                                auto
                                accept="image/*" customUpload uploadHandler={customBase64Uploader} />
                </div>
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(onSubmit)} method="post">
                <Card title="Formulario de registro">
                <div className="container-main-img-candidate flex justify-content-center mt-1">
                        <div className='flex flex-column justify-content-center align-items-center m-1'>
                            <span>Foto</span>
                            <div className="candidate-container">
                                {choosePhoto && <img className="candidate-img" src={choosePhoto} alt="" />}
                            </div>
                            <PhotoField />

                        </div>
                        <div className='flex flex-column justify-content-center align-items-center m-1'>
                            <span>Logo</span>
                            <div className="candidate-container">
                                {chooseLogo && <img className="candidate-img" src={chooseLogo} alt="" />}
                            </div>
                            <LogoField />

                        </div>
                    </div>

                    <label htmlFor="dni">DNI</label>
                    <DniField />

                    <label htmlFor="nombres">Nombres</label>
                    <NombresField />

                    <label htmlFor="apellidos">Apellidos</label>
                    <ApellidosField />

                    <label htmlFor="grado">Grado</label>
                    <GradoField />

                    <label htmlFor="seccion">Sección</label>
                    <SeccionField />

                    <Button
                        label="Registrar"
                        className="mb-2 mt-2"
                        type="submit"
                        outlined
                    />
                </Card>
            </form>
        </div>
    );
};
