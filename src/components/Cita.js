import React from 'react';
import PropTypes from 'prop-types';
const Cita = ({cita,eliminarCita}) => (
    <div className='cita'>
        <p>ID: <span>{cita.id}</span></p>
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.dueño}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Sintomas: <span>{cita.sintomas}</span></p>

        <button
            className='button eliminar u-full-width'
            onClick={ () => eliminarCita(cita.id)  }//asi espera a que suceda el onclick si lo coloco
            //directamente asi {eliminarCita()} va a hacer el llamado directamente sin esperar el click
        >Eliminar &times;</button>

    </div>
  );

  //documentar cita
    Cita.propTypes = {
        cita: PropTypes.object.isRequired,
        eliminarCita: PropTypes.func.isRequired
    }
export default Cita;
 