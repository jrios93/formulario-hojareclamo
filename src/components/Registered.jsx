const Registered = ({ userName, pdfGenerated }) => {
  const handleDownloadPDF = () => {
    // Llama a la función pasada desde el componente Form para descargar el PDF
    pdfGenerated && pdfGenerated.save(`reclamacion_${Date.now()}.pdf`);
  };
  return (
    <div className="w-1/2 bg-white rounded-md shadow-md flex flex-col justify-center items-start p-10 gap-8  font-poppins">
      <h2 className="text-6xl font-bold">¡Hoja Registrada!</h2>
      <p className="text-sm">
        {userName} Tú reclamo ha sido registrado en nuestro sistema con éxito.
        Se envio una copia del reclamo al correo especificado.
      </p>
      <p className="text-sm">Aquí puedes descargar tu Hoja presentada</p>

      <div className="flex justify-between gap-4 text-white font-bold">
        <button
          className="px-6 py-2 border rounded-md bg-red-400"
          onClick={handleDownloadPDF}
        >
          Descargar PDF
        </button>
        <button className="px-6 py-2 border rounded-md bg-sky-400">
          Sigue Navegando
        </button>
      </div>
    </div>
  );
};

export default Registered;
