# Pruebas de Integración

## Descripción
Las pruebas de integración verifican que los diferentes módulos o servicios del software funcionen correctamente en conjunto.

## Instrucciones
1. **Identificar Módulos**: Selecciona los módulos que interactúan entre sí.
2. **Escribir Casos de Prueba**: Crea casos de prueba que verifiquen la interacción entre los módulos.
3. **Configurar Entorno**: Asegúrate de que todos los módulos necesarios estén disponibles y configurados correctamente.
4. **Ejecutar Pruebas**: Utiliza un framework de pruebas para ejecutar los casos de prueba.
5. **Revisar Resultados**: Analiza los resultados y corrige cualquier problema de integración.

## Ejemplo
```javascript
const { createCoco, createFireball, updateCocos, updateFireballs } = require('./script');

test('createCoco should add a new coco to the cocos array', () => {
    const initialLength = cocos.length;
    createCoco();
    expect(cocos.length).toBe(initialLength + 1);
});

test('createFireball should add a new fireball to the fireballs array', () => {
    const initialLength = fireballs.length;
    createFireball('ground');
    expect(fireballs.length).toBe(initialLength + 1);
});

test('updateCocos should decrease lives when a coco hits the ground', () => {
    lives = 3;
    const coco = { style: { top: `${canvas.height + 1}px` }, className: 'coco' };
    cocos.push(coco);
    updateCocos();
    expect(lives).toBe(2);
});
