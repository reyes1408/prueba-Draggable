import React, { useState } from 'react';

function App() {
  const [elementos, setElementos] = useState([
    'Elemento 1',
    'Elemento 2',
    'Elemento 3',
    'Elemento 4',
    'Elemento 5',
    'Elemento 6',
    'Elemento 7',
    'Elemento 8',
    'Elemento 9',
    'Elemento 10',
  ]);

  const [contenedores, setContenedores] = useState([
    { id: 1, contenido: [] },
    { id: 2, contenido: [] },
    { id: 3, contenido: [] },
    { id: 4, contenido: [] },
  ]);

  const handleDragStart = (e, elemento) => {
    e.dataTransfer.setData('text/plain', elemento);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, contenedorId) => {
    e.preventDefault();
    const elementoArrastrado = e.dataTransfer.getData('text/plain');
    const nuevoContenedores = [...contenedores];
    const nuevosElementos = elementos.filter((item) => item !== elementoArrastrado);

    // Removemos el elemento del contenedor original
    nuevoContenedores.forEach((contenedor) => {
      if (contenedor.id === 5) return; // Ignorar el contenedor de "Elementos"
      contenedor.contenido = contenedor.contenido.filter(
        (item) => item !== elementoArrastrado
      );
    });

    // Agregamos el elemento al nuevo contenedor
    nuevoContenedores.forEach((contenedor) => {
      if (contenedor.id === contenedorId) {
        contenedor.contenido = [...contenedor.contenido, elementoArrastrado];
      }
    });

    setContenedores(nuevoContenedores);
    setElementos(nuevosElementos);
  };

  return (
    <div className="App">

      <div className="flex">
      <div
        className="w-1/4 border border-dashed p-2 m-2"
        style={{
          height: '300px', // Altura fija para mostrar aproximadamente 5 elementos
          overflowY: 'auto', // Agregar barra de desplazamiento vertical si es necesario
        }}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, 5)} // Usamos un ID ficticio para el contenedor de "Elementos"
      >
        <p>Elementos</p>
        {elementos.map((item, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white p-2 m-2 h-24 cursor-pointer"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item}
          </div>
        ))}
      </div>

        {contenedores.map((contenedor) => (
          <div
            key={contenedor.id}
            className="w-1/4 border border-dashed p-2 m-2"
            style={{
              height: '500px', // Altura fija para mostrar aproximadamente 5 elementos
              overflowY: 'auto', // Agregar barra de desplazamiento vertical si es necesario
            }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, contenedor.id)}
          >
            <p>Contenedor {contenedor.id}</p>
            {contenedor.contenido.map((item, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white p-2 m-2 h-24 cursor-pointer"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
