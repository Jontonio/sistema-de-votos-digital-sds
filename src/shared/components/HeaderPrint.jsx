import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer'; 

const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' },
  logoSDS: { width: 55, height: 60, opacity:"0.9"},
  logoONPE: { width: 65, height: 55},
  title: { fontSize: 18, textAlign: 'center', marginBottom: 5, fontWeight: 'bold' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 5, fontWeight: 'bold' },
  text: { fontSize: 10, textAlign: 'center', marginBottom: 5, fontWeight: 'bold' },
  separator: { marginTop: 2, marginBottom: 15, borderBottomWidth: 2, borderBottomColor: 'black' },
});

const year = new Date().getFullYear() + 1;

export const HeaderPrint = () => {
  return (
    <>
      <View style={styles.header}>
        <View>
          <Image style={styles.logoONPE} src="../assets/imgs/onpe.png" />
        </View>
        <View style={{ flex: 3, marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.title}>ELECCIÓN DEL MUNICIPIO ESCOLAR {year}</Text>
          <Text style={styles.subtitle}>I.E. SANTO DOMINGO SAVIO</Text>
          <Text style={styles.text}>CRUZPATA - MARAS</Text>
        </View>
        <View>
            <Image style={styles.logoSDS} src="../assets/imgs/insignia.png" />
        </View>
      </View>
    </>
  );
};
