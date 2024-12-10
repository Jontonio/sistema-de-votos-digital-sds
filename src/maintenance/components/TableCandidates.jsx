import { Column, DataTable, Button} from '../../libs/prime-react'

export const TableCandidates = ({ candidates, sendDelete }) => {

    const selectToDelete = (dni) => {
        sendDelete(dni);
    }

    const acctionTemplate = ({ dni }) => {
        return <div>
            <Button  severity="success" label="Editar" size="small" text disabled/>
            <Button severity="danger" label="Eliminar" size="small" text onClick={() => selectToDelete(dni)}/>
        </div>
    }

    const grateSecctionTemplate = ({ grado, seccion }) => {
        return <div>&quot;{grado}&quot;-&quot;{seccion}&quot;</div>
    }

    const photoTemplate = ({ photo }) => {
        return <div className='candidate-img-registered'>
            <img className='candidate-img' src={photo} alt="" />
        </div>
    }

    const logoTemplate = ({ logo }) => {
        return <div className='candidate-img-registered'>
            <img className='candidate-img' src={logo} alt="" />
        </div>
    }

    return (
        <div>
            <DataTable value={candidates} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="dni" header="DNI"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
                    <Column header="Grado y sección" body={grateSecctionTemplate}></Column>
                    <Column header="Foto" body={photoTemplate}></Column>
                    <Column header="Logo" body={logoTemplate}></Column>
                    <Column header="Acción" body={acctionTemplate}></Column>
            </DataTable>
        </div>
    )
}
