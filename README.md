# EC Logo App

## 📖 Descripción General
Una aplicación móvil desarrollada con **React Native** y **Expo** que muestra la plantilla de la Selección Ecuatoriana de Fútbol convocada para las eliminatorias rumbo al Mundial 2026. La aplicación cuenta con una pantalla de bienvenida (splash screen), un listado deslizable de los jugadores convocados y un modal con información detallada de cada jugador al hacer clic sobre su tarjeta.

---

## 📁 Estructura del Proyecto
```
ec_logo_app/
├─ assets/                # Recursos gráficos de la app (logo, imágenes, etc.)
├─ App.js                 # Archivo principal – Lógica, componentes y estilos
├─ README.md              # Documentación de la aplicación (este archivo)
├─ .gitignore             # Archivos y carpetas ignorados por Git
└─ package.json           # Configuración del proyecto y sus dependencias (generado por Expo)
```

---

## 🧩 Explicación del Código Paso a Paso (App.js)

El archivo `App.js` agrupa toda la funcionalidad del proyecto en un solo lugar. A continuación se describe detalladamente qué hace cada sección:

### 1️⃣ Importaciones y Recursos Iniciales (Líneas 1 a 24)
```javascript
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,     // Evita que el diseño se superponga con la barra de estado o muescas (notches) en los teléfonos.
  View,             // Funciona como un contenedor div genérico para agrupar elementos.
  Text,             // Componente obligatorio para renderizar texto en pantalla.
  StyleSheet,       // Permite crear estilos similares a CSS usando objetos de JavaScript.
  FlatList,         // Componente optimizado para mostrar listas largas de forma fluida.
  Image,            // Utilizado para renderizar imágenes locales o de internet.
  TouchableOpacity, // Botón o tarjeta táctil que reduce su opacidad al ser presionado para simular un clic.
  Modal,            // Ventana emergente (overlay) que se muestra sobre la pantalla principal.
  ScrollView,       // Contenedor que permite hacer scroll a un bloque de texto o contenido específico.
  StatusBar,        // Controla la apariencia de la barra de estado del celular (hora, batería, señal).
} from 'react-native';

const logoEcuador = require('./assets/logo-ecuador.png');
```
* **¿Qué hace?** Importa las librerías necesarias de React y los componentes nativos de React Native. También importa la imagen local del escudo de Ecuador de la carpeta `assets` para su uso en la pantalla de bienvenida y el encabezado.

---

### 2️⃣ Datos de los Jugadores – Array `jugadores` (Líneas 26 a 207)
```javascript
const jugadores = [
  {
    id: '1',
    nombre: 'Hernán Galíndez',
    edad: 38,
    equipo: 'Huracán',
    paisClub: 'Argentina',
    origen: 'Rosario, Argentina / nacionalizado ecuatoriano',
    posicion: 'Arquero',
    foto: 'https://ui-avatars.com/api/?name=Hernan+Galindez&...',
  },
  // ... resto de los jugadores convocados
];
```
* **¿Qué hace?** Es la capa de datos de la aplicación. Contiene un arreglo de objetos JavaScript. Cada objeto representa un futbolista e incluye información clave como nombre, club actual, edad, posición y una URL para generar una foto de perfil personalizada (usando la API libre `ui-avatars.com`).

---

### 3️⃣ Pantalla de Bienvenida – Componente `SplashScreen` (Líneas 209 a 218)
```javascript
/* Componente SplashScreen – Muestra la pantalla inicial con el logo y títulos */
function SplashScreen() {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6D32D" />
      <Image source={logoEcuador} style={styles.splashLogo} />
      <Text style={styles.splashTitle}>Selección Ecuatoriana</Text>
      <Text style={styles.splashSubtitle}>Rumbo al Mundial 2026</Text>
    </SafeAreaView>
  );
}
```
* **¿Qué hace?** Renderiza una pantalla de color amarillo con el escudo de Ecuador centrado y títulos descriptivos. Se configura la barra de estado del celular para que combine perfectamente con el color de fondo. Esta pantalla se muestra durante un breve intervalo de tiempo al abrir la app.

---

### 4️⃣ Ventana Emergente de Detalle – Componente `DetailModal` (Líneas 220 a 243)
```javascript
function DetailModal({ jugador, visible, onClose }) {
  if (!jugador) return null; // Si no hay un jugador seleccionado, no renderiza nada.

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
```
* **¿Qué hace?** Recibe por propiedades (`props`) el objeto del jugador seleccionado, si debe ser visible y la función para cerrarse. Muestra de forma elegante y organizada la foto del jugador, su posición y su información de club. Al pulsar el botón "Cerrar", invoca la función `onClose` para ocultar la ventana modal.

---

### 5️⃣ Pantalla Principal – Componente `HomeScreen` (Líneas 245 a 285)
```javascript
function HomeScreen() {
  const [selected, setSelected] = useState(null); // Guarda el jugador que el usuario seleccionó para el modal.

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
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={logoEcuador} style={styles.headerLogo} />
        <View style={styles.headerTextBox}>
          <Text style={styles.headerTitle}>Ecuador 2026</Text>
          <Text style={styles.headerSubtitle}>Listado de convocados</Text>
        </View>
      </View>
      {/* Caja de descripción */}
      <ScrollView style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Aplicación móvil básica desarrollada con React Native y Expo. Toca cualquier jugador para revisar su información principal.
        </Text>
      </ScrollView>
      {/* Listado de jugadores */}
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {/* Componente Modal */}
      <DetailModal jugador={selected} visible={!!selected} onClose={() => setSelected(null)} />
    </SafeAreaView>
  );
}
```
* **¿Qué hace?** Es la pantalla central del aplicativo. Renderiza la barra superior de color verde con el escudo de Ecuador. Muestra una breve descripción inicial y despliega la lista interactiva de jugadores mediante `FlatList`. Al presionar sobre un jugador, actualiza el estado `selected` con la información de ese jugador para que `DetailModal` se active y la muestre.

---

### 6️⃣ Componente Raíz – `App` (Líneas 287 a 296)
```javascript
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Apaga la pantalla de bienvenida después de 2.2 segundos
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <HomeScreen />;
}
```
* **¿Qué hace?** Es el punto de entrada oficial de la app. Utiliza el gancho `useState` para gestionar si se debe visualizar el splash screen y `useEffect` con un temporizador (`setTimeout`) para cambiar este estado automáticamente a `false` después de 2200 milisegundos (2.2 segundos), dando paso a la `HomeScreen`.

---

### 7️⃣ Diseño y Estilos – `styles` (Líneas 298 a 468)
```javascript
const styles = StyleSheet.create({
  // ... definición de estilos flex, colores, fuentes, sombras y espaciados
});
```
* **¿Qué hace?** Define todos los estilos de la aplicación.
* **Aspectos clave del diseño:**
  * **Paleta temática:** Uso del amarillo brillante (`#F6D32D`) y el verde oscuro (`#0B3D2E`) representativos de Ecuador.
  * **Sombras y Bordes:** Las tarjetas y modales cuentan con bordes redondeados (`borderRadius: 16` y `24`) y sombras leves para ofrecer un aspecto premium, limpio y moderno.
  * **Flexbox:** Distribuye y alinea los elementos de forma adaptable para diferentes resoluciones de celulares.

---

## 🔄 Flujo de Funcionamiento de la Aplicación
1. **Inicio:** Al abrir la aplicación se ejecuta el componente raíz (`App`) que por defecto muestra el componente `SplashScreen` durante 2.2 segundos.
2. **Cambio de Pantalla:** Finalizado el temporizador, se desmonta el splash screen y se renderiza `HomeScreen`.
3. **Exploración de la Lista:** El usuario desliza de arriba a abajo por el listado de convocados (`FlatList`), el cual dibuja tarjetas interactivas de cada jugador.
4. **Interacción:** El usuario pulsa la tarjeta de algún jugador. El componente `HomeScreen` captura los datos de ese jugador en el estado `selected`.
5. **Detalle:** Al detectar que hay un jugador seleccionado, el componente `DetailModal` se activa automáticamente mostrando la información detallada del futbolista sobre la pantalla.
6. **Cierre:** Al pulsar el botón "Cerrar" del modal, el estado se limpia a `null` y la ventana emergente desaparece con una suave animación.

---

## 📦 Librerías Principales y su Utilidad

| Librería | ¿Para qué sirve en este proyecto? |
| :--- | :--- |
| **React** | Proporciona la lógica para crear componentes reusables y el manejo de los estados (`useState`, `useEffect`). |
| **React Native** | Aporta los componentes listos para compilar en código nativo de iOS y Android (`View`, `Text`, `FlatList`, `Modal`, etc.). |
| **Expo** | Suite de herramientas de desarrollo que permite correr la app directamente en el celular (vía Expo Go) sin configuraciones complicadas de Android Studio o Xcode. |

---

## 🚀 Cómo Instalar y Ejecutar el Proyecto (Paso a Paso)

Sigue estos sencillos pasos en tu consola de comandos para clonar, instalar y probar el aplicativo móvil:

### 1️⃣ Instalar Node.js y Expo Go
Asegúrate de tener instalado [Node.js](https://nodejs.org/). En tu dispositivo móvil iOS o Android, descarga de forma gratuita la aplicación **Expo Go** desde el App Store o Google Play Store.

### 2️⃣ Clonar el Repositorio e Instalar las Dependencias
```bash
# Clona el proyecto en tu máquina local
git clone <URL_DEL_REPOSITORIO>

# Entra en la carpeta del proyecto
cd ec_logo_app

# Instala todas las dependencias necesarias indicadas en el package.json
npm install
```

### 3️⃣ Iniciar el Servidor de Desarrollo
```bash
npx expo start
```

### 4️⃣ Visualizar la Aplicación
Al ejecutar el comando anterior, se levantará la herramienta de Expo y mostrará un código **QR** en la consola:
* **En Android:** Abre la aplicación **Expo Go** en tu celular y pulsa "Scan QR Code" para escanear el código.
* **En iOS:** Abre la cámara por defecto de tu iPhone, enfoca el código QR y pulsa en la notificación para abrirlo en Expo Go.
* **Emuladores:** Si cuentas con un emulador configurado, presiona la tecla `a` en tu teclado para abrirlo en el simulador de Android, o `i` para el simulador de iOS.

---

## 💡 Consejos de Desarrollo y Edición
* **Cambios en Caliente (Fast Refresh):** Cualquier cambio que hagas en `App.js` y guardes se verá reflejado inmediatamente en la pantalla de tu celular.
* **Añadir nuevos jugadores:** Si deseas agregar nuevos futbolistas, simplemente ve al array `jugadores` e introduce un objeto que siga el formato preestablecido.
* **Modificar Colores:** Si deseas cambiar los colores de la app, actualiza los valores hexadecimales dentro de la constante `styles` ubicada al final de `App.js`.

---

## 🛠️ Próximas Mejoras Sugeridas
1. **Conexión a una API:** Traer los datos de los futbolistas de forma dinámica desde una base de datos externa (como Firebase o un servicio REST).
2. **React Navigation:** Agregar un sistema de navegación con múltiples pestañas o pantallas (ej. una sección de estadísticas o tabla de posiciones).
3. **Modo Oscuro:** Adaptar los estilos de forma dinámica según el tema del dispositivo mediante el hook `useColorScheme` de React Native.
4. **Pruebas de Software:** Incorporar pruebas unitarias utilizando **Jest** y **React Native Testing Library**.

---

### 📝 Licencia
Este proyecto es libre de uso y modificación bajo la licencia MIT.
