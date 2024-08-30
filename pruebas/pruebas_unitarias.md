# Pruebas Unitarias

## Descripción
Las pruebas unitarias son pruebas de bajo nivel que verifican el funcionamiento de métodos y funciones individuales en el código.

## Instrucciones
1. **Identificar Componentes**: Selecciona los métodos y funciones que deseas probar.
2. **Escribir Casos de Prueba**: Crea casos de prueba para cada método, asegurándote de cubrir diferentes escenarios y condiciones.
3. **Ejecutar Pruebas**: Utiliza un framework de pruebas como `Jest` para JavaScript para ejecutar los casos de prueba.
4. **Revisar Resultados**: Analiza los resultados de las pruebas y corrige cualquier error encontrado.
5. **Automatización**: Configura un servidor de integración continua para ejecutar las pruebas automáticamente con cada cambio en el código.

## Ejemplo
```javascript
const { moveDinoLeft, moveDinoRight, jumpDino } = require('./script');

test('moveDinoLeft should decrease dinoX', () => {
    dinoX = 100;
    moveDinoLeft();
    expect(dinoX).toBe(80);
});

test('moveDinoRight should increase dinoX', () => {
    dinoX = 100;
    moveDinoRight();
    expect(dinoX).toBe(120);
});

test('jumpDino should set isJumping to true', () => {
    isJumping = false;
    jumpDino();
    expect(isJumping).toBe(true);
});
