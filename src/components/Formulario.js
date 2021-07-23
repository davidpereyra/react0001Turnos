import React,{Fragment, useState} from 'react';
import { v4 as uuid } from 'uuid'; // La sintaxis la encontre en node modules
import PropTypes from 'prop-types';
//{crearCita} esta aplicando descomposicion para no usar el props y luego el this
const Formulario = ({crearCita}) => {
    //Crear state de citas
    const [cita, actualizarCita] = useState ({
        mascota: '',
        propietario: '',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //Segundo state para manejar errores
    const [error, actualizarError] = useState(false)

    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => { //event e ,cada vez que cambia el campo se pasa al evento
        //console.log(e.target.value); para ver que se esta ecribiendo
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const {mascota,propietario,fecha,hora,sintomas} = cita;

    //Cuando el usuario presiona "agregar cita"
    const submitCita = e => {
        //alert('Enviando');
        e.preventDefault();
        console.log('Enviando Form...');
        
        //Validar 
            if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''|| hora.trim() === '' || sintomas.trim() === '') {
                console.log('Hay un error');     
                actualizarError(true);
                return; // Si no esta este return no corta y sigue la ejecucion.           
            }
        //Eliminar mensaje de error cuando es exitoso
        actualizarError(false);
        //Asignar un ID
            cita.id = uuid();//20; //se puede asignar un id 
            //Se instala libreria por consola de comandos "npm i uuid"
            console.log(cita);
        //Crear la cita
            crearCita(cita);
        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>

            {error ? <p className='alerta-error'> Todos los campos son obligatorios</p> : null}

            <form
                onSubmit = {submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState} // en la documentacion la funcion se llama handleChange}
                    value={mascota}
                />
                
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Deuño de la Mascota'
                    onChange={actualizarState}
                    value={propietario}

                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'       
                    onChange={actualizarState}     
                    value={fecha}

                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'                    
                    onChange={actualizarState}
                    value={hora}

                />
                <label>Síntomas</label>
                <textarea
                    name='sintomas'
                    className='u-full-width'   
                    onChange={actualizarState}     
                    value={sintomas}

                ></textarea>
                <button
                    type='submit'
                    className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
                    
                
            </form>
        </Fragment>
    );
}

//documentar componentes
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;