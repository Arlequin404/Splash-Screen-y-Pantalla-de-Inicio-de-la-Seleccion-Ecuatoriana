/*
 * Aplicación móvil de selección ecuatoriana para el Mundial 2026
 * Construida con React Native y Expo.
 * Muestra una lista de jugadores convocados y permite ver detalles.
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';

const jugadores = [
  {
    id: '1',
    nombre: 'Hernán Galíndez',
    edad: 38,
    equipo: 'Huracán',
    paisClub: 'Argentina',
    origen: 'Rosario, Argentina / nacionalizado ecuatoriano',
    posicion: 'Arquero',
    foto: 'https://ui-avatars.com/api/?name=Hernan+Galindez&background=ffdd00&color=111111&size=256',
  },
  {
    id: '2',
    nombre: 'Alexander Domínguez',
    edad: 38,
    equipo: 'Liga de Quito',
    paisClub: 'Ecuador',
    origen: 'Esmeraldas, Ecuador',
    posicion: 'Arquero',
    foto: 'https://ui-avatars.com/api/?name=Alexander+Dominguez&background=ffdd00&color=111111&size=256',
  },
  {
    id: '3',
    nombre: 'Moisés Ramírez',
    edad: 25,
    equipo: 'Independiente del Valle',
    paisClub: 'Ecuador',
    origen: 'Guayaquil, Ecuador',
    posicion: 'Arquero',
    foto: 'https://ui-avatars.com/api/?name=Moises+Ramirez&background=ffdd00&color=111111&size=256',
  },
  {
    id: '4',
    nombre: 'Piero Hincapié',
    edad: 24,
    equipo: 'Bayer Leverkusen',
    paisClub: 'Alemania',
    origen: 'Esmeraldas, Ecuador',
    posicion: 'Defensa central',
    foto: 'https://ui-avatars.com/api/?name=Piero+Hincapie&background=005bbb&color=ffffff&size=256',
  },
  {
    id: '5',
    nombre: 'William Pacho',
    edad: 24,
    equipo: 'Paris Saint-Germain',
    paisClub: 'Francia',
    origen: 'Quinindé, Ecuador',
    posicion: 'Defensa central',
    foto: 'https://ui-avatars.com/api/?name=William+Pacho&background=005bbb&color=ffffff&size=256',
  },
  {
    id: '6',
    nombre: 'Félix Torres',
    edad: 29,
    equipo: 'Corinthians',
    paisClub: 'Brasil',
    origen: 'San Lorenzo, Ecuador',
    posicion: 'Defensa central',
    foto: 'https://ui-avatars.com/api/?name=Felix+Torres&background=005bbb&color=ffffff&size=256',
  },
  {
    id: '7',
    nombre: 'Ángelo Preciado',
    edad: 28,
    equipo: 'Sparta Praga',
    paisClub: 'República Checa',
    origen: 'Shushufindi, Ecuador',
    posicion: 'Lateral derecho',
    foto: 'https://ui-avatars.com/api/?name=Angelo+Preciado&background=005bbb&color=ffffff&size=256',
  },
  {
    id: '8',
    nombre: 'Pervis Estupiñán',
    edad: 28,
    equipo: 'Brighton & Hove Albion',
    paisClub: 'Inglaterra',
    origen: 'Esmeraldas, Ecuador',
    posicion: 'Lateral izquierdo',
    foto: 'https://ui-avatars.com/api/?name=Pervis+Estupinan&background=005bbb&color=ffffff&size=256',
  },
  {
    id: '9',
    nombre: 'José Hurtado',
    edad: 24,
    equipo: 'Red Bull Bragantino',
    paisClub: 'Brasil',
    origen: 'Santo Domingo, Ecuador',
    posicion: 'Lateral derecho',
    foto: 'https://ui-avatars.com/api/?name=Jose+Hurtado&background=005bbb&color=ffffff&size=256',
  },
  {
    id: '10',
    nombre: 'Moisés Caicedo',
    edad: 24,
    equipo: 'Chelsea',
    paisClub: 'Inglaterra',
    origen: 'Santo Domingo, Ecuador',
    posicion: 'Mediocampista',
    foto: 'https://ui-avatars.com/api/?name=Moises+Caicedo&background=ed1c24&color=ffffff&size=256',
  },
  {
    id: '11',
    nombre: 'Alan Franco',
    edad: 27,
    equipo: 'Atlético Mineiro',
    paisClub: 'Brasil',
    origen: 'Jujan, Ecuador',
    posicion: 'Mediocampista',
    foto: 'https://ui-avatars.com/api/?name=Alan+Franco&background=ed1c24&color=ffffff&size=256',
  },
  {
    id: '12',
    nombre: 'Carlos Gruezo',
    edad: 31,
    equipo: 'San Jose Earthquakes',
    paisClub: 'Estados Unidos',
    origen: 'Santo Domingo, Ecuador',
    posicion: 'Mediocampista',
    foto: 'https://ui-avatars.com/api/?name=Carlos+Gruezo&background=ed1c24&color=ffffff&size=256',
  },
  {
    id: '13',
    nombre: 'Kendry Páez',
    edad: 19,
    equipo: 'Chelsea',
    paisClub: 'Inglaterra',
    origen: 'Guayaquil, Ecuador',
    posicion: 'Mediocampista ofensivo',
    foto: 'https://ui-avatars.com/api/?name=Kendry+Paez&background=ed1c24&color=ffffff&size=256',
  },
  {
    id: '14',
    nombre: 'Jeremy Sarmiento',
    edad: 23,
    equipo: 'Brighton & Hove Albion',
    paisClub: 'Inglaterra',
    origen: 'Madrid, España / ecuatoriano',
    posicion: 'Extremo',
    foto: 'https://ui-avatars.com/api/?name=Jeremy+Sarmiento&background=ed1c24&color=ffffff&size=256',
  },
  {
    id: '15',
    nombre: 'Gonzalo Plata',
    edad: 25,
    equipo: 'Flamengo',
    paisClub: 'Brasil',
    origen: 'Guayaquil, Ecuador',
    posicion: 'Extremo derecho',
    foto: 'https://ui-avatars.com/api/?name=Gonzalo+Plata&background=ffdd00&color=111111&size=256',
  },
  {
    id: '16',
    nombre: 'Enner Valencia',
    edad: 36,
    equipo: 'Internacional',
    paisClub: 'Brasil',
    origen: 'San Lorenzo, Ecuador',
    posicion: 'Delantero',
    foto: 'https://ui-avatars.com/api/?name=Enner+Valencia&background=ffdd00&color=111111&size=256',
  },
  {
    id: '17',
    nombre: 'Kevin Rodríguez',
    edad: 26,
    equipo: 'Union Saint-Gilloise',
    paisClub: 'Bélgica',
    origen: 'Ibarra, Ecuador',
    posicion: 'Delantero',
    foto: 'https://ui-avatars.com/api/?name=Kevin+Rodriguez&background=ffdd00&color=111111&size=256',
  },
  {
    id: '18',
    nombre: 'Jordy Caicedo',
    edad: 28,
    equipo: 'Sporting de Gijón',
    paisClub: 'España',
    origen: 'Machala, Ecuador',
    posicion: 'Delantero',
    foto: 'https://ui-avatars.com/api/?name=Jordy+Caicedo&background=ffdd00&color=111111&size=256',
  },
];

/*
 * SplashScreen: pantalla de bienvenida con logo y título.
 */
function SplashScreen() {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6D32D" />
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>EC</Text>
      </View>
      <Text style={styles.splashTitle}>Selección Ecuatoriana</Text>
      <Text style={styles.splashSubtitle}>Rumbo al Mundial 2026</Text>
    </SafeAreaView>
  );
}

/*
 * DetailModal: muestra información detallada del jugador seleccionado.
 */
function DetailModal({ jugador, visible, onClose }) {
  if (!jugador) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Image source={{ uri: jugador.foto }} style={styles.modalImage} />
          <Text style={styles.modalName}>{jugador.nombre}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Edad: {jugador.edad} años</Text>
            <Text style={styles.infoText}>Equipo: {jugador.equipo}</Text>
            <Text style={styles.infoText}>País del club: {jugador.paisClub}</Text>
            <Text style={styles.infoText}>Origen: {jugador.origen}</Text>
            <Text style={styles.infoText}>Posición: {jugador.posicion}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function HomeScreen() {
  const [selected, setSelected] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelected(item)}>
      <Image source={{ uri: item.foto }} style={styles.playerImage} />
      <View style={styles.cardContent}>
        <Text style={styles.playerName}>{item.nombre}</Text>
        <Text style={styles.playerPosition}>{item.posicion}</Text>
        <Text style={styles.playerTeam}>{item.equipo}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B3D2E" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ecuador 2026</Text>
        <Text style={styles.headerSubtitle}>Listado de convocados</Text>
      </View>
      <ScrollView style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Aplicación móvil básica desarrollada con React Native y Expo. Toca cualquier jugador para revisar su información principal.
        </Text>
      </ScrollView>
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <DetailModal jugador={selected} visible={!!selected} onClose={() => setSelected(null)} />
    </SafeAreaView>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <HomeScreen />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#F6D32D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#0B3D2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 6,
    borderColor: '#005BBB',
  },
  logoText: {
    color: '#F6D32D',
    fontSize: 42,
    fontWeight: 'bold',
  },
  splashTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B3D2E',
    textAlign: 'center',
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#1F2933',
    marginTop: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    backgroundColor: '#0B3D2E',
    paddingTop: 20,
    paddingBottom: 22,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#F6D32D',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
  },
  descriptionBox: {
    maxHeight: 85,
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  listContent: {
    padding: 16,
    paddingBottom: 28,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  playerImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#DDDDDD',
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
  },
  playerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  playerPosition: {
    fontSize: 14,
    color: '#0B3D2E',
    marginTop: 3,
    fontWeight: '600',
  },
  playerTeam: {
    fontSize: 13,
    color: '#555555',
    marginTop: 3,
  },
  arrow: {
    fontSize: 34,
    color: '#0B3D2E',
    paddingHorizontal: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DDDDDD',
    marginBottom: 14,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3D2E',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoBox: {
    alignSelf: 'stretch',
    backgroundColor: '#F4F6F8',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  infoText: {
    fontSize: 15,
    color: '#222222',
    marginBottom: 8,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#0B3D2E',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
