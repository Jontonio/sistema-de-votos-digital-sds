import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { HeaderPrint } from './HeaderPrint';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', padding: 20 },
    footer: { position: 'absolute', bottom: 5, left: 5, right: 5, fontSize: 8 },
    tableContainer: { marginTop: 10 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, alignItems: 'center', height: 24, fontSize: 8 },
    tableHeader: { backgroundColor: '#d8d8d8', fontSize: 10, fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 2, borderLeftWidth: 1, },
    tableCell: { padding: 5, borderLeftWidth: 1, textAlign: 'center' },
    tableCellBody: { padding: 7, borderLeftWidth: 1, textAlign: 'center' },
    tableCellGS: {
        padding: 5,
        borderLeftWidth: 1,
        textAlign: 'center',
        fontSize: 8,
        wordBreak: 'break-word',  
        whiteSpace: 'normal',     
        flexWrap: 'wrap',       
        overflow: 'hidden',       
        maxWidth: '100%',        
      },
      tableCellID: { padding: 5, color: 'blue', borderLeftWidth: 1, textAlign: 'center' },
    titleTable: { fontSize: 12, textAlign: 'center', marginBottom: 5, fontWeight: 'bold' },
});

export const PrintStudent = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="portrait">
                <HeaderPrint />
                <View>
                    <Text style={styles.titleTable}>LISTA DE PADRÓN ELECTORAL</Text>
                </View>
                <View style={styles.tableContainer}>
                    {/* Encabezados de la tabla */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, { width: 40 }]}>N°</Text>
                        <Text style={[styles.tableCell, { width: 70 }]}>DNI</Text>
                        <Text style={[styles.tableCell, { width: 180 }]}>Nombres y Apellidos</Text>
                        <Text style={[styles.tableCellID, { width: 60 }]}>Código</Text>
                        <Text style={[styles.tableCellGS, { width: 60 }]}>Grado y Sección</Text>
                        <Text style={[styles.tableCell, { width: 80 }]}>Firma</Text>
                        <Text style={[styles.tableCell, { width: 80}]}>Huella</Text>
                    </View>
                    {/* Filas de datos */}
                    {data && data.map((rowData, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={[styles.tableCellBody, { width: 40 }]}>{index + 1}</Text>
                            <Text style={[styles.tableCellBody, { width: 70 }]}>{rowData.dni}</Text>
                            <Text style={[styles.tableCellBody, { width: 180 }]}>{rowData.nombres} {rowData.apellidos}</Text>
                            <Text style={[styles.tableCellID, { width: 60 }]}>{rowData.keyVoter}</Text>
                            <Text style={[styles.tableCellBody, { width: 60 }]}>{rowData.grado} {rowData.seccion}</Text>
                            <Text style={[styles.tableCellBody, { width: 80 }]}> </Text>
                            <Text style={[styles.tableCellBody, { width: 80}]}> </Text>
                        </View>
                    ))}
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
};
