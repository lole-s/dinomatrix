# Requerimientos del Proyecto Matrix Con Dino Interactivo

## 1. Recopilación y Análisis de Requisitos

### Objetivo del Proyecto
Desarrollar un juego interactivo donde el jugador controle un dinosaurio que debe atrapar huevos esquivar bolas de fuego y no ser atrapado por el dino-vigilante. El juego está destinado a ser una herramienta educativa para enseñar técnicas de programación y testing para estudiantes de 6to año de la escuela ProA de Corral de Bustos - Ifflinger.

### Requisitos Funcionales
1. **Control del Dinosaurio**: El jugador debe poder mover el dinosaurio hacia la izquierda, derecha y hacerlo saltar para esquivar obstáculos.
2. **Obstáculos**: El juego debe incluir huevos y bolas de fuego que caen desde la parte superior de la pantalla y un dino-vigilante que ingresa desde la parte inferior derecha de la pantalla. 
3. **Puntuación**: El juego debe mostrar la puntuación del jugador en tiempo real.
4. **Niveles de Dificultad**: El juego debe tener aumentar su dificultad progresivamente a maedica que el jugador vaya sumando puntos.
5. **Sonido**: Se deben incluir una musica de fondo y efectos de sonido para acciones específicas: cuando el dinosaurio atrapa un huevo, cuando es golpeado por el dino-vigilante o por una huevo de fuego, cuando atrapa un dino-bebe y un sonido especial de game-over.
6. **Vidas del Jugador**: El juego debe incluir un sistema de vidas, donde el jugador tenga un número limitado de vidas que disminuyen cada vez que el dinosaurio es golpeado por un obstáculo y aumenta cuando atrapa un dino-bebe.
7. **Inicio**: El juego debe comenzar cuando el jugador pulsa un boton de "play".
8. **Fin**: El juego debe finalizar cuando las vidas del dinosaurio llegan a 0, en se momento debe salir una imagen animada de game over.  
9. **Records**: El juego debe pemitir que el llevar un historial de 10 records ordenados de mayor a menor, dicho historial deba aprarecer por 10 segundo luego del game-over. 

### Requisitos No Funcionales
1. **Rendimiento**: El juego debe funcionar sin problemas en dispositivos con especificaciones mínimas.
2. **Seguridad**: Asegurar que el juego no tenga vulnerabilidades que puedan ser explotadas.
3. **Mantenibilidad**: El código debe ser claro y bien documentado para facilitar futuras modificaciones.

## 2. Planificación

### Cronograma
- **Semana 1-2**: Recopilación y análisis de requisitos.
- **Semana 3-4**: Diseño del juego y la interfaz de usuario.
- **Semana 5-8**: Desarrollo del juego.
- **Semana 9-10**: Pruebas y debugging.
- **Semana 11**: Despliegue y mantenimiento inicial.

### Recursos Necesarios
- **Herramientas de Desarrollo**: Visual Studio Code, Python, JavaScript.
- **Equipo de Desarrollo**: 2 desarrolladores (incluyendo a los autores).
- **Hardware**: Computadoras con especificaciones mínimas para desarrollo y pruebas.

## 3. Diseño

### Arquitectura del Sistema
- **Frontend**: HTML, CSS, JavaScript.
- **Backend**: Python.
- **Base de Datos**: No se requiere.

### Diagrama de Componentes
- **Interfaz de Usuario**: Control del dinosaurio, visualización de huevos y bolas de fuego.
- **Lógica del Juego**: Gestión de niveles, puntuación y eventos del juego.
- **Sonido**: Efectos de sonido para acciones específicas.

## 4. Desarrollo

### Metodología
- **Desarrollo Ágil**: Iteraciones cortas con revisiones frecuentes.

## 5. Pruebas

### Tipos de Pruebas
- **Debugging**: Identificación y corrección de errores.
- **Pruebas Exploratorias**: Evaluación del juego desde la perspectiva del usuario.
- **Pruebas Unitarias**: Verificación de componentes individuales del código.
- **Pruebas de Caja Blanca**: Pruebas basadas en el conocimiento del código interno.
- **Pruebas de Caja Negra**: Pruebas basadas en los requisitos y funcionalidades.

## 6. Despliegue

### Estrategia de Despliegue
- **Entorno de Pruebas**: Despliegue inicial en un entorno de pruebas para validación.
- **Entorno de Producción**: Despliegue final para uso por los alumnos.

## 7. Operaciones y Mantenimiento

### Plan de Mantenimiento
- **Actualizaciones**: Implementación de mejoras y corrección de errores.
- **Soporte**: Asistencia técnica para los usuarios.

