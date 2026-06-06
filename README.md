# Ecuador Mundial 2026

## Descripción
Aplicación móvil *React Native* desarrollada con **Expo** que muestra la lista de los jugadores convocados por Ecuador para el Mundial 2026. Cada jugador se presenta en una tarjeta; al tocarla se abre un modal con información detallada.

## Instalación
```bash
# 1️⃣ Clonar el repositorio (o descargar los archivos)
git clone <repo‑url>

# 3️⃣ Instalar dependencias con npm o yarn
npm install   # o: yarn install
```
> **Nota:** La aplicación usa **Expo**, si no lo tienes instalado ejecuta `npm install -g expo-cli`.

## Ejecución
```bash
# Iniciar el servidor de desarrollo
expo start
```
Esto abrirá el *Metro Bundler* en el navegador. Puedes abrir la app en:
- **Emulador Android** (con Android Studio) → pulsar *Run on Android device/emulator*.
- **Emulador iOS** (macOS) → pulsar *Run on iOS simulator*.
- **Dispositivo físico** → escanear el QR con la app *Expo Go*.

## Flujo de la aplicación
1. **SplashScreen** – Pantalla de bienvenida que se muestra 2 s después de iniciar la app.
2. **HomeScreen** – Lista de jugadores (`FlatList`). Cada ítem es un `TouchableOpacity` que, al pulsarse, guarda el jugador seleccionado en el estado `selected`.
3. **DetailModal** – Modal que recibe el jugador seleccionado y muestra sus datos (edad, equipo, país del club, origen, posición) y una foto. El modal se cierra con el botón *Cerrar*.
4. Al cerrar el modal, el estado vuelve a `null` y la lista vuelve a estar disponible.

## Comentarios en el código
Se añadieron bloques de comentarios (`/* … */`) antes de los componentes principales para describir su propósito:
- `SplashScreen` – pantalla de bienvenida.
- `DetailModal` – muestra información detallada del jugador.
- `HomeScreen` – lista principal.
- `App` – orquesta la visualización del splash y la pantalla principal.

## Tecnologías usadas
- **React Native** (v0.74)
- **Expo** (para simplificar la configuración y el despliegue)
- **JavaScript (ES6+)**

## Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.
