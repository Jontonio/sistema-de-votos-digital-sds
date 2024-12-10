import { Column, DataTable, Button} from '../../libs/prime-react'


export const TableStudents = ({ students, sendDelete }) => {

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

    return (
        <div>
            <DataTable value={students} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="keyVoter" header="Código de voto"></Column>
                    <Column field="dni" header="DNI"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
                    <Column header="Grado" body={grateSecctionTemplate}></Column>
                    <Column header="Acción" body={acctionTemplate}></Column>
            </DataTable>
        </div>
    )
}
