import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorFetchComponent() {
  return (
    <div className="error-search mt-4">
      <Alert variant="warning" className="text-center">
        Errore nel caricamento della pagina. Riprova o Ricarica la pagina
      </Alert>
    </div>
  );
}
