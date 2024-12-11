import { Outlet, useNavigate } from "react-router-dom"
import { Menu, Toast } from "../../libs/prime-react";
import { eliminarToken, validarToken, obtenerToken  } from "../../auth/helpers/auth"
import { useEffect, useRef, useState } from "react";

export const MaintenanceMain = () => {

    const [isToken, setIsToken] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();
    const items = [
        {
            label: 'Estudiantes',
            items: [
                {
                    label: 'Nuevo estudiante',
                    icon: 'pi pi-plus',
                    command: () => {
                        navigate('./add-student');
                    }
                },
                {
                    label: 'Estudiantes',
                    icon: 'pi pi-book',
                    command: () => {
                        navigate('./students');
                    }
                }
            ]
        },
        {
            label: 'Candidatos',
            items: [
                {
                    label: 'Nuevo candidato',
                    icon: 'pi pi-face-smile',
                    command: () => {
                        navigate('./add-candidate');
                    }
                },
                {
                    label: 'Candidatos',
                    icon: 'pi pi-table',
                    command: () => {
                        navigate('./candidates');
                    }
                }
            ]
        },
        {
            label: 'Resultados',
            items: [
                {
                    label: 'Resultado electoral',
                    icon: 'pi pi-chart-bar',
                    command: () => {
                        navigate('./results-voter');
                    }
                } 
            ]
        },
        {
            label: 'Mantenimiento',
            items: [
                {
                    label: 'Configuración',
                    icon: 'pi pi-database',
                    command: () => {
                        navigate('./setting');
                    }
                },
                {
                    label: 'Salir',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        eliminarToken();
                        navigate('/',{ replace:true });
                    }
                }
            ]
        }
    ];

    useEffect(() => {
        if (!validarToken()) {
            setIsToken(null);
            navigate('../login', { replace: true });
        }else{
            const token = obtenerToken();
            setIsToken(token)
        }
    }, [navigate]);

    return (
        <>
            {isToken && 
            <div className="flex row">
                <Toast ref={toast}/>
                <div className="col-3">
                    <Menu model={items} className="w-full h-screen"/>
                </div>
                <div className="col-9">
                    <Outlet></Outlet>
                </div>
            </div>}
        </>
    )
}
