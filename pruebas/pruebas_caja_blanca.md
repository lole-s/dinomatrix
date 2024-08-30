# Pruebas de Caja Blanca

## Descripción
Las pruebas de caja blanca se basan en el conocimiento del código interno y verifican el flujo lógico y las estructuras de control.

## Instrucciones
1. **Revisar Código**: Analiza el código fuente para identificar las estructuras de control y los flujos lógicos.
2. **Escribir Casos de Prueba**: Crea casos de prueba que verifiquen cada camino posible en el código.
3. **Ejecutar Pruebas**: Utiliza un framework de pruebas para ejecutar los casos de prueba.
4. **Revisar Resultados**: Analiza los resultados y corrige cualquier error encontrado.

## Ejemplo
```javascript
const { updateCocos, updateFireballs } = require('./script');

test('updateCocos should increase score when a coco is collected', () => {
    score = 0;
    const coco = { style: { top: '50px' }, className: 'coco' };
    cocos.push(coco);
    updateCocos();
    expect(score).toBe(10);
});

test('updateFireballs should decrease lives when a fireball hits the dino', () => {
    lives = 3;
    const fireball = { element: { style: { top: '50px', left: `${dinoX}px` } }, type: 'air' };
    fireballs.push(fireball);
    updateFireballs();
    expect(lives).toBe(2);
});
