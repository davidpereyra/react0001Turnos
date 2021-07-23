import React,{Fragment, useState, useEffect} from 'react';
//useEffect operaciones para cuando cambia el state
import Formulario from './components/Formulario';
import Cita from './components/Cita';
function App() {

  //Citas en local storage ¿hay citas?
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));//como localstoge solo almacena string usamos JSON parse que convierte el arreglo dentro de un string
  if (!citasIniciales) {
    citasIniciales = []; //si no hay citas son igual a un arreglo vacio y queda como valor inicial del use state
  }

  //Arreglo de citas, el del formulario es cita, este es el de todas las citas
  const [citas,guardarCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(()=>{// siempre es un arrow function en jquery es parecido al document.ready()
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));//como localstoge solo almacena string usamos JSON parse que convierte el arreglo dentro de un string
    console.log('useEffect listo o hay cambios en el componente citas');
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); //paso un [] para que se ejecute solo una vez al pasarle [citas] se ejecuta cuando citas cambie
  //Funcion que tome las citas actuales y agrega la nueva (leer la nueva cita + la cita existentes)
  const crearCita = cita => {
    //console.log(cita);
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //funcion que elimina una cita por su id, no se manda directamente desde cita porque ya esta el arreglo aca
  const eliminarCita = id =>{
    console.log(id)
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas); //nuevasCitas ya es un areglo por eso no necesita corchetes
  }

    //Mensaje condicional
    console.log(citas.length); //Si la cantidad de citas es 0 es cuando muestra el otro titulo
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';
  return (
    <Fragment>    
      <h1>Administrador de pacientes</h1>
      <div className ='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario 
              crearCita ={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>   
            {/* para listar citas usamos el map, es mas usado en react en vez del foreach
              es un arroy function que tiene implicito el return con el parentesis
            */}         
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}       
                eliminarCita={eliminarCita}          
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
