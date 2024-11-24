// componentes/administrador/Reportes/Reportes.js
import React, { useState } from "react";

const Reportes = () => {
    const [genero, setGenero] = useState("");
    const [rangoEdadInicio, setRangoEdadInicio] = useState("");
    const [rangoEdadFin, setRangoEdadFin] = useState("");

    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
    };

    const handleRangoEdadInicioChange = (e) => {
        setRangoEdadInicio(e.target.value);
    };

    const handleRangoEdadFinChange = (e) => {
        setRangoEdadFin(e.target.value);
    };

    const handleFiltrar = () => {
        console.log("Filtros aplicados:");
        console.log("Género:", genero);
        console.log("Rango de Edad:", rangoEdadInicio, "-", rangoEdadFin);
        // Aquí se implementará la lógica para realizar la solicitud al backend con los filtros
    };

    return (
        <div className="reportes-container">
            <h2>Reportes</h2>
            <div className="reportes-buttons">
                <button className="btn-reporte-popularidad">Popularidad de Temáticas (con calificación)</button>
                <button className="btn-reporte-inscripciones">Cantidad de Inscripciones Globales</button>
            </div>
            <div className="reportes-filtros">
                <label htmlFor="genero">Género:</label>
                <select id="genero" value={genero} onChange={handleGeneroChange}>
                    <option value="">Seleccione un género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                <div className="rango-edad">
                    <label htmlFor="rangoEdadInicio">Rango de Edad:</label>
                    <input
                        type="number"
                        id="rangoEdadInicio"
                        placeholder="Desde"
                        value={rangoEdadInicio}
                        onChange={handleRangoEdadInicioChange}
                    />
                    <input
                        type="number"
                        id="rangoEdadFin"
                        placeholder="Hasta"
                        value={rangoEdadFin}
                        onChange={handleRangoEdadFinChange}
                    />
                </div>
                <button className="btn-filtrar" onClick={handleFiltrar}>Filtrar</button>
            </div>
        </div>
    );
};

export default Reportes;