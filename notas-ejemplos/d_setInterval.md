#### **setInterval**

La función `setInterval` en JavaScript se utiliza para ejecutar una función repetidamente con un intervalo de tiempo fijo entre cada ejecución. La sintaxis básica es:

```javascript
setInterval(función, milisegundos);
```

Donde:
- `función` es la función que quieres ejecutar repetidamente.
- `milisegundos` es el intervalo de tiempo en milisegundos entre cada ejecución de la función⁴.

Por ejemplo, si quieres mostrar un mensaje en la consola cada segundo, podrías usar:

```javascript
setInterval(() => {
  console.log("Hola, mundo!");
}, 1000);
```

#### **CallBack**

Un **callback** es una función que se pasa como argumento a otra función y se ejecuta después de que la función principal haya terminado su tarea. En el contexto de `setInterval`, la función que se pasa como primer argumento es el callback.

Aquí tienes un ejemplo sencillo de un callback:

```javascript
function saludar(nombre) {
  console.log(`Hola, ${nombre}`);
}

function procesarEntradaUsuario(callback) {
  const nombre = "Juan";
  callback(nombre);
}

procesarEntradaUsuario(saludar);
```

En este ejemplo, `saludar` es la función callback que se pasa a `procesarEntradaUsuario` y se ejecuta dentro de esta última.