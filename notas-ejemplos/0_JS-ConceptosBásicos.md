### JS - Conceptos Básicos

En un proyecto web, los archivos HTML, CSS y JavaScript se interconectan de la siguiente manera:

1. **HTML**: Es el archivo principal que estructura el contenido de la página web. Aquí es donde se enlazan los archivos CSS y JavaScript.

2. **CSS**: Se utiliza para estilizar el contenido del HTML. Para conectar un archivo CSS con el HTML, se utiliza la etiqueta `<link>` dentro del `<head>` del documento HTML. Por ejemplo:
    ```html
    <link rel="stylesheet" href="styles.css">
    ```

3. **JavaScript**: Se utiliza para añadir interactividad a la página web. Para conectar un archivo JavaScript con el HTML, se utiliza la etiqueta `<script>`. Esta etiqueta puede ir en el `<head>` o al final del `<body>`, dependiendo de cuándo se quiera que se cargar el script. Por ejemplo:
    ```html
    <script src="script.js"></script>
    ```
A continuación, se muestra un ejemplo básico de cómo se vería un archivo HTML que conecta con archivos CSS y JavaScript:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Proyecto Web</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>¡Hola, mundo!</h1>
    <p>Este es un ejemplo de cómo conectar archivos HTML, CSS y JavaScript.</p>
    <script src="script.js"></script>
</body>
</html>
```

En este ejemplo:
- El archivo `styles.css` se carga para aplicar estilos al contenido.
- El archivo `script.js` se carga para añadir interactividad.


___ 

## JAVASCRIPT

### 1. Historia
JavaScript es un lenguaje de programación de alto nivel, interpretado y orientado a objetos, que se utiliza principalmente para el desarrollo web. Fue creado en 1995 por Brendan Eich mientras trabajaba en Netscape Communications. Originalmente se llamó Mocha, luego LiveScript, y finalmente JavaScript. Es un lenguaje de programación que se ejecuta en el navegador y permite crear páginas web interactivas.

### 2. Tipado
JavaScript es un lenguaje de **tipado dinámico**, lo que significa que no necesitas declarar el tipo de una variable explícitamente. El tipo se determina en tiempo de ejecución. Por ejemplo:
```javascript
let variable = 42; // Número
variable = "Hola"; // Ahora es una cadena de texto
```

### 3. Utilización más habitual
JavaScript se utiliza principalmente para:
- **Manipulación del DOM (Document Object Model)**: Modificar el contenido y la estructura de una página web.
- **Validación de formularios**: Verificar datos antes de enviarlos al servidor.
- **Interactividad**: Crear efectos dinámicos como animaciones y eventos.
- **Comunicación con servidores**: Realizar peticiones HTTP para obtener o enviar datos (AJAX, Fetch API).

### 4. Intérprete
Un intérprete de JavaScript (también conocido como motor de JavaScript) es un programa que lee y ejecuta el código JavaScript. Los navegadores web modernos incluyen un intérprete de JavaScript que traduce las instrucciones escritas en este lenguaje y las ejecuta en tiempo real.

#### Funciones del intérprete:
 - Lectura del código: El intérprete lee el código JavaScript línea por línea.
 - Traducción: Convierte el código JavaScript en instrucciones que la máquina puede entender.
 - Ejecución: Ejecuta las instrucciones traducidas, permitiendo que el código interactúe con el DOM, realice cálculos, maneje eventos, etc.

Para saber qué intérprete estás usando, puedes verificar el entorno en el que se ejecuta tu código JavaScript:
- **Navegadores**: La mayoría de los navegadores modernos (Chrome, Firefox, Safari, Edge) tienen su propio motor JavaScript (V8 para Chrome, SpiderMonkey para Firefox, etc.).
- **Node.js**: Si estás ejecutando JavaScript en el servidor, probablemente estés usando Node.js, que también utiliza el motor V8.

Para verificar en el navegador, puedes abrir la consola de desarrollador (F12 o Ctrl+Shift+I) y ejecutar:
```javascript
console.log(navigator.userAgent);
```
En Node.js, puedes ejecutar:
```javascript
console.log(process.version);
```

### 5. Funciones o métodos por defecto
JavaScript tiene muchas funciones y métodos integrados. Aquí algunos ejemplos:
- **Funciones globales**: `alert()`, `console.log()`, `parseInt()`, `parseFloat()`.
- **Métodos de cadenas**: `toUpperCase()`, `toLowerCase()`, `substring()`, `split()`.
- **Métodos de arrays**: `push()`, `pop()`, `shift()`, `unshift()`, `map()`, `filter()`, `reduce()`.
