import { useForm } from "react-hook-form";
import { Button, InputText, Toast } from '../../libs/prime-react';
import { useRef } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from "../../db/indexedDBUser";
import { showError } from "../../shared/message"
import { generarToken } from "../helpers/auth";
export const FormLogin = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm({ mode:'all' });
    const toast = useRef(null);

    const navigate = useNavigate();
    
    const onSubmit = async (data) => {

        const { email, password } = data;

        getUserByEmail(email).then( data => {
            if(data){
                if(String(data.password).match(password)) {
                    const { nombres, email } = data;
                    generarToken({ nombres, email })
                    navigate('/config', { replace:true })
                }else{
                    showError(toast, "Error auth", "El email y/o password es incorrecta")
                }
            }
        }).catch( e => {
            console.log(e)
            showError(toast, "Error de auth", String(e))
        })
    };

    return (
        <> 
            <Toast position="top-center" ref={toast} />
            <div className="align-items-center justify-content-center">
                <div>
                    <h1 className="m-0">Inicie sesión</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-d-flex p-flex-column">
                        <div className="mt-2">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="username">Correo electrónico</label>
                                <span className="p-input-icon-right">
                                    <InputText className={errors.email?'p-invalid w-full':'w-full'} id="username" type="email" {...register("email", { required: true  })} />
                                </span>
                                <small className="text-error">
                                    {errors.email?.type == 'required' && <span>Este campo es requerido</span>}
                                    {errors.email?.type== 'pattern' && <span>Digite un correo electrónico válido</span>}
                                </small>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="password">Contraseña</label>
                                <span className="p-input-icon-right">
                                    <InputText className={errors.password?'p-invalid w-full':'w-full'} 
                                            id="password" 
                                            autoComplete="off"
                                            type={'password'} 
                                            {...register("password", { required: true })} />
                                </span>
                                <small className="text-error">
                                    {errors.password?.type == 'required' && <span>El campo contraseña es requerido</span>}
                                </small>
                            </div>
                        </div>
                        <div>
                            <Button label="Iniciar sesión" 
                                    type="submit" 
                                    // disabled={ mutelogin.isLoading }
                                    className="w-full mt-4 custom-btn"></Button>
                                    <div className="text-center mt-3">
                                        <Link to="/" className="no-underline font-medium text-blue-500">Regresar a la página de inicio</Link>
                                    </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
