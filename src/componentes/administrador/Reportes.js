/*import React, { useState } from "react";
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
                    Filtrar Reportes con Calificación
                </button>
            </div>

            <div className="reportes-content">
                {view === "popularidadTemas" && <PopularidadTemas />}
                {view === "cantidadInscripciones" && <CantidadInscripciones />}
                {view === "filtrosReporte" && <FiltrosReporte />}
            </div>
        </div>
    );
};

export default Reportes;*/

// añadido defensa
import React, { useState } from "react";
import PopularidadTemas from "./PopularidadTemas";
import CantidadInscripciones from "./CantidadInscripciones";
import FiltrosReporte from "./FiltrosReporte";
import ReporteSubtematicas from "./ReporteSubtematicas"; // Importa el nuevo componente

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

    const handleSubtematicasClick = () => {
        setView("reporteSubtematicas"); // Nueva vista
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
                    Filtrar Reportes con Calificación
                </button>
                <button onClick={handleSubtematicasClick} className="btn-reporte">
                    Reporte Subtemáticas por Profesor
                </button>
            </div>

            {/* Renderizar la vista seleccionada */}
            <div className="reportes-content">
                {view === "popularidadTemas" && <PopularidadTemas />}
                {view === "cantidadInscripciones" && <CantidadInscripciones />}
                {view === "filtrosReporte" && <FiltrosReporte />}
                {view === "reporteSubtematicas" && <ReporteSubtematicas />} {/* Nueva vista */}
            </div>
        </div>
    );
};

export default Reportes;