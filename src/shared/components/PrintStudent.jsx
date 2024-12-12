import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { HeaderPrint } from './HeaderPrint';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', padding: 20 },
    footer: { position: 'absolute', bottom: 5, left: 5, right: 5, fontSize: 8 },
    tableContainer: { marginTop: 10 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, alignItems: 'center', height: 24, fontSize: 8 },
    tableHeader: { backgroundColor: '#d8d8d8', fontSize: 10, fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth:1 },
    tableCell: { padding: 5, borderLeftWidth: 1, textAlign: 'center' },
    tableCellBody: { padding: 7, borderLeftWidth: 1, textAlign: 'center', flexWrap:"wrap"},
    tableCellGS: {
        padding: 5,
        borderLeftWidth: 1,
        textAlign: 'center',
        fontSize: 8,
      },
      tableCellID: { padding: 5, color: 'blue', borderLeftWidth: 1, textAlign: 'center' },
    titleTable: { fontSize: 12, textAlign: 'center', marginBottom: 5, fontWeight: 'bold' },
});


export const PrintStudent = ({ data, showCode }) => {

    const publicDataVoter = <>
        {/* Encabezados de la tabla */}
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: 40 }]}>N°</Text>
            <Text style={[styles.tableCell, { width: 70 }]}>DNI</Text>
            <Text style={[styles.tableCell, { width: 165 }]}>Nombres</Text>
            <Text style={[styles.tableCell, { width: 165 }]}>Apellidos</Text>
            <Text style={[styles.tableCellGS, { width: 46 }]}>Grado</Text>
            <Text style={[styles.tableCellGS, { width: 40 }]}>Sección</Text>
        </View>
        {/* Filas de datos */}
        {data && data.map((rowData, index) => (
            <View style={styles.tableRow} key={index}>
                <Text style={[styles.tableCellBody, { width: 40 }]}>{index + 1}</Text>
                <Text style={[styles.tableCellBody, { width: 70 }]}>{rowData.dni}</Text>
                <Text style={[styles.tableCellBody, { width: 165 }]}>{rowData.nombres}</Text>
                <Text style={[styles.tableCellBody, { width: 165 }]}>{rowData.apellidos}</Text>
                <Text style={[styles.tableCellBody, { width: 46 }]}>{rowData.grado}</Text>
                <Text style={[styles.tableCellBody, { width: 40 }]}>&quot;{rowData.seccion}&quot;</Text>
            </View>
        ))}
    </>

const privateDataVoter = <>
        {/* Encabezados de la tabla */}
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: 40 }]}>N°</Text>
            <Text style={[styles.tableCell, { width: 55 }]}>DNI</Text>
            <Text style={[styles.tableCell, { width: 180 }]}>Nombres y Apellidos</Text>
            <Text style={[styles.tableCellID, { width: 60 }]}>Código</Text>
            <Text style={[styles.tableCellGS, { width: 75 }]}>Grado y Sección</Text>
            <Text style={[styles.tableCell, { width: 80 }]}>Firma</Text>
            <Text style={[styles.tableCell, { width: 80}]}>Huella</Text>
        </View>
        {/* Filas de datos */}
        {data && data.map((rowData, index) => (
            <View style={styles.tableRow} key={index}>
                <Text style={[styles.tableCellBody, { width: 40 }]}>{index + 1}</Text>
                <Text style={[styles.tableCellBody, { width: 55 }]}>{rowData.dni}</Text>
                <Text style={[styles.tableCellBody, { width: 180 }]}>{rowData.nombres} {rowData.apellidos}</Text>
                <Text style={[styles.tableCellID, { width: 60 }]}>{rowData.keyVoter}</Text>
                <Text style={[styles.tableCellBody, { width: 75 }]}>{rowData.grado} &quot;{rowData.seccion}&quot;</Text>
                <Text style={[styles.tableCellBody, { width: 80 }]}> </Text>
                <Text style={[styles.tableCellBody, { width: 80}]}> </Text>
            </View>
        ))}
        </>


    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="portrait">
                <HeaderPrint />
                <View>
                    <Text style={styles.titleTable}>LISTA DE PADRÓN ELECTORAL</Text>
                </View>
                <View style={styles.tableContainer}>
                { showCode?publicDataVoter:privateDataVoter }
                </View>
                <Text style={styles.footer}>Reporte generado por el sistema de votos</Text>
            </Page>
        </Document>
    );
}

PrintStudent.propTypes = {
    data: PropTypes.oneOfType([ 
        PropTypes.array, 
        PropTypes.object 
    ]), 
    showCode: PropTypes.bool
};
