import React, { useState } from "react";
import PopularidadTemas from "./PopularidadTemas";

const Reportes = () => {
    const [view, setView] = useState("");

    const handlePopularidadTemasClick = () => {
        setView("popularidadTemas");
    };

    const handleCantidadInscripcionesClick = () => {
        setView("cantidadInscripciones");
    };

    return (
        <div className="reportes-container">
            <h2>Reportes</h2>

            {/* Botones de selección */}
            <div className="reportes-buttons">
                <button
                    onClick={handlePopularidadTemasClick}
                    className="btn-reporte"
                >
                    Popularidad de Temáticas con Calificación
                </button>
                <button
                    onClick={handleCantidadInscripcionesClick}
                    className="btn-reporte"
                >
                    Cantidad de Inscripciones Globales
                </button>
            </div>

            {/* Filtros */}
            <div className="reportes-filtros">
                <label>
                    Género:
                    <select>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </label>
                <label>
                    Rango de Edad:
                    <input type="number" placeholder="Mínimo" />
                    <input type="number" placeholder="Máximo" />
                </label>
                <button className="btn-filtrar">Filtrar</button>
            </div>

            {/* Renderizar la vista seleccionada */}
            <div className="reportes-content">
                {view === "popularidadTemas" && <PopularidadTemas />}
                {view === "cantidadInscripciones" && (
                    <p>Aquí irá la funcionalidad de Cantidad de Inscripciones.</p>
                )}
            </div>
        </div>
    );
};

export default Reportes;