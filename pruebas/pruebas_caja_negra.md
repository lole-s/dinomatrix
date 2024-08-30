# Pruebas de Caja Negra

## Descripción
Las pruebas de caja negra verifican la funcionalidad del software sin conocer su código interno, basándose en los requisitos y especificaciones.

## Instrucciones
1. **Revisar Requisitos**: Analiza los requisitos y especificaciones del juego.
2. **Escribir Casos de Prueba**: Crea casos de prueba que verifiquen las funcionalidades descritas en los requisitos.
3. **Ejecutar Pruebas**: Realiza las pruebas manualmente o utilizando un framework de pruebas.
4. **Revisar Resultados**: Analiza los resultados y corrige cualquier problema encontrado.

## Ejemplo
```javascript
const { gameLoop, createCoco, createFireball } = require('./script');

test('gameLoop should call createCoco at intervals', () => {
    jest.useFakeTimers();
    gameLoop();
    jest.advanceTimersByTime(2500);
    expect(createCoco).toHaveBeenCalled();
});

test('gameLoop should call createFireball at intervals', () => {
    jest.useFakeTimers();
    gameLoop();
    jest.advanceTimersByTime(5000);
    expect(createFireball).toHaveBeenCalled();
});
