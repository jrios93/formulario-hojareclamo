import { useState } from "react";
import Form from "./components/Form";
import "./global.css";
import Registered from "./components/Registered";
const App = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [userName, setUserName] = useState("");
  const [pdfGenerated, setPdfGenerated] = useState(null);
  const toggleMostrarFormulario = (name, pdf) => {
    setUserName(name);
    setPdfGenerated(pdf);
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <section className="w-full min-h-screen flex justify-center p-16 font-poppin">
      {mostrarFormulario ? (
        <Form onShowRegistered={toggleMostrarFormulario} />
      ) : (
        <Registered userName={userName} pdfGenerated={pdfGenerated} />
      )}
    </section>
  );
};

export default App;
