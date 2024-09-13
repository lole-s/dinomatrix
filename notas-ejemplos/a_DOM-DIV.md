

### ¿Qué es el DOM?

El DOM (Document Object Model) es una representación en forma de árbol de un documento HTML o XML. Permite a los lenguajes de programación, como JavaScript, acceder y manipular la estructura, el contenido y el estilo de los documentos web de manera dinámica.

#### Características del DOM:
- **Estructura en Árbol**: Cada nodo en el árbol representa una parte del documento (etiquetas, atributos, texto).
- **Interfaz de Programación**: Proporciona métodos y propiedades para acceder y modificar los nodos.

#### Ejemplo de Estructura del DOM:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Ejemplo de DOM</title>
</head>
<body>
    <div id="miDiv">
        <p>Texto dentro del div.</p>
    </div>
</body>
</html>
```

### ¿Qué es un `<div>`?

El `<div>` es un elemento HTML que se utiliza para agrupar otros elementos HTML y aplicarles estilos o scripts en conjunto. Es un contenedor genérico que no tiene un significado específico por sí mismo, pero es muy útil para estructurar y organizar el contenido de una página web.

#### Ejemplo de Uso de `<div>`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Ejemplo de Div</title>
    <style>
        .contenedor {
            border: 1px solid #000;
            padding: 10px;
        }        
    </style>
</head>
<body>
    <div class="contenedor">
        <h1>Hola, Mundo</h1>
        <p>Este es un párrafo dentro de un div.</p>
    </div>
</body>
</html>
```

### Manipulación del DOM con JavaScript

JavaScript puede interactuar con el DOM para cambiar el contenido, la estructura y el estilo de una página web.

#### Ejemplo de Manipulación del DOM:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Manipulación del DOM</title>
    <script>
        function cambiarTexto() {
            var miDiv = document.getElementById("miDiv");
            miDiv.innerHTML = "<p>Texto cambiado por JavaScript.</p>";
        }
    </script>
</head>
<body>
    <div id="miDiv">
        <p>Texto original dentro del div.</p>
    </div>
    <button onclick="cambiarTexto()">Cambiar Texto</button>
</body>
</html>
```

En este ejemplo, al hacer clic en el botón, se ejecuta la función `cambiarTexto` que modifica el contenido del `<div>` con el id `miDiv`.

### Resumen

- **DOM**: Una representación en forma de árbol de un documento HTML que permite a JavaScript acceder y manipular la estructura, el contenido y el estilo de la página web.

- **`<div>`**: Un contenedor genérico en HTML utilizado para agrupar y aplicar estilos o scripts a otros elementos.
