
## CANVAS 

En el contexto de la programación web, un __canvas__ es un elemento HTML que se utiliza para dibujar gráficos mediante JavaScript. Es como un lienzo en blanco sobre el que puedes dibujar formas, gráficos, imágenes y otros elementos visuales.

### Ejes X e Y en Canvas

En un elemento `<canvas>`, el sistema de coordenadas se organiza de la siguiente manera:

- **Eje X**: Corre horizontalmente de izquierda a derecha.
- **Eje Y**: Corre verticalmente de arriba hacia abajo.

### Unión de los Ejes

La unión de los ejes X e Y, también conocida como el origen (0,0), está en la esquina superior izquierda del `<canvas>`. A medida que te mueves hacia la derecha, el valor de X aumenta. A medida que te mueves hacia abajo, el valor de Y aumenta.

### Ejemplo Visual

Aquí tienes un ejemplo visual de cómo se ven los ejes en un `<canvas>`:

```
(0,0) --------------------> X
  |
  |
  |
  |
  v
  Y
```

### Ejemplo de Código

Vamos a crear un ejemplo simple que dibuje los ejes X e Y en un `<canvas>`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Canvas Ejes X e Y</title>
</head>
<body>
    <canvas id="miCanvas" width="500" height="500" style="border:1px solid #000;"></canvas>
    <script>
        const canvas = document.getElementById('miCanvas');
        const ctx = canvas.getContext('2d');

        // Dibujar eje X
        ctx.beginPath();
        ctx.moveTo(0, 250); // Punto inicial (0, 250)
        ctx.lineTo(500, 250); // Punto final (500, 250)
        ctx.strokeStyle = 'red';
        ctx.stroke();

        // Dibujar eje Y
        ctx.beginPath();
        ctx.moveTo(250, 0); // Punto inicial (250, 0)
        ctx.lineTo(250, 500); // Punto final (250, 500)
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    </script>
</body>
</html>
```

En este ejemplo:

- El eje X se dibuja en rojo y corre horizontalmente a través del centro del `<canvas>`.
- El eje Y se dibuja en azul y corre verticalmente a través del centro del `<canvas>`.

### Resumen

- **Eje X**: Corre de izquierda a derecha.
- **Eje Y**: Corre de arriba hacia abajo.
- **Origen (0,0)**: Está en la esquina superior izquierda del `<canvas>`.
