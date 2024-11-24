import React, { useState } from "react";
import PopularidadTemas from "./PopularidadTemas";
import CantidadInscripciones from "./CantidadInscripciones";
import FiltrosReporte from "./FiltrosReporte";

const Reportes = () => {
    const [view, setView] = useState("");

    const handlePopularidadTemasClick = () => {
        setView("popularidadTemas");
    };

    const handleCantidadInscripcionesClick = () => {
        setView("cantidadInscripciones");
    };

    const handleFiltrosClick = () => {
        setView("filtrosReporte");
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
                <button onClick={handleFiltrosClick} className="btn-reporte">
                    Filtrar Reportes
                </button>
            </div>

            {/* Renderizar la vista seleccionada */}
            <div className="reportes-content">
                {view === "popularidadTemas" && <PopularidadTemas />}
                {view === "cantidadInscripciones" && <CantidadInscripciones />}
                {view === "filtrosReporte" && <FiltrosReporte />}
            </div>
        </div>
    );
};

export default Reportes;