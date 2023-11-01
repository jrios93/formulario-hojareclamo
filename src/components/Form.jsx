import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { AiFillAlert } from "react-icons/ai";
import jsPDF from "jspdf";

const Form = ({ onShowRegistered, pdfGenerated }) => {
  const [nameInput, setNameInput] = useState("");
  const [documentIdentity, setDocumentIdentity] = useState("");
  const [selectDocument, setSelectDocument] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const date = new Date();
  const regex = /[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
  const regexDi = /[a-z!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

  const handleChangeName = (eve) => {
    const newNameInput = eve.target.value;
    setNameInput(newNameInput);
    validateForm(newNameInput, selectDocument, documentIdentity);
  };

  const handleChangeDi = (eve) => {
    const newDocumentIdentity = eve.target.value;
    setDocumentIdentity(newDocumentIdentity);
    validateForm(nameInput, newDocumentIdentity, selectDocument);
  };

  const handleChangeSelect = (eve) => {
    const newSelectDocument = eve.target.value;
    setSelectDocument(newSelectDocument);
    validateForm(nameInput, newSelectDocument, documentIdentity);
  };

  const validateForm = (
    newNameInput,
    newSelectDocument,
    newDocumentIdentity
  ) => {
    const isNameValid = newNameInput.trim() !== "" && !regex.test(newNameInput);
    const isSelectedDocumentValid = newSelectDocument !== "";
    const isDocumentValid = newDocumentIdentity !== "";
    setIsSubmitDisabled(
      !(isNameValid && isSelectedDocumentValid && isDocumentValid)
    );
  };

  const handleClick = (eve) => {
    eve.preventDefault();
    onShowRegistered(nameInput);
    handleDownloadPDF();
  };

  const handleDownloadPDF = () => {
    // Crea un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Agrega la información del formulario al PDF
    doc.text("Hoja de Reclamaciones", 10, 10);
    doc.text(
      `Fecha de reclamo: ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
      10,
      20
    );
    doc.text("Datos Generales", 10, 30);
    doc.text("Comercio, Servicios Integrales y Tecnologias S.A.C.", 10, 40);
    doc.text("RUC: 20568033354", 10, 50);
    doc.text(
      "Jr. Manuel Irribaren Nro. 935 Int. F Lima Lima - Surquillo",
      10,
      60
    );
    doc.text("Tus Datos", 10, 70);
    doc.text("Nombres y Apellidos: ", 10, 70);
    doc.rect(70, 28, 100, 10);
    doc.text(nameInput, 72, 35);
    doc.text("Tipo de documento: " + selectDocument, 10, 90);
    doc.text("Número de documento: " + documentIdentity, 10, 100);

    onShowRegistered(nameInput, doc);
  };

  return (
    <div className="w-1/2 bg-white rounded-md shadow-md flex flex-col p-6 gap-6 font-poppin">
      <div>
        <p className="text-xs text-slate-700">
          Fecha de reclamo: {date.getDate()}/{date.getMonth() + 1}/
          {date.getFullYear()}
        </p>
        <div className="flex justify-center p-6">
          <h2 className="text-4xl uppercase font-bold text-slate-900 p-4">
            Hoja de reclamaciones
          </h2>
        </div>
        <div className="text-xs flex justify-between flex-col">
          <h2 className="font-semibold underline">Datos Generales</h2>
          <p>Comercio, Servicios Integrales y Tecnologias S.A.C. </p>
          <p>RUC: 20568033354</p>
          <p>Jr. Manuel Irribaren Nro. 935 Int. F Lima Lima - Surquillo</p>
        </div>
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Tus Datos</h3>
          <label className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm">
              Nombres y Apellidos <span className="text-red-500">(*)</span>
            </p>
            <input
              className="w-full rounded-md border p-2 text-sm"
              value={nameInput}
              onChange={handleChangeName}
            />
            {nameInput.trim() === "" ? (
              <span
                className={`text-red-500 text-xs font-semibold flex items-center gap-2`}
              >
                <FiAlertCircle />
                Complete este dato.
              </span>
            ) : regex.test(nameInput) ? (
              <span className="text-red-500 text-xs font-semibold flex items-center gap-2">
                <AiFillAlert />
                No debe contener números o caracteres especiales.
              </span>
            ) : (
              ""
            )}
          </label>

          <label className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm">
              Tipo de documento <span className="text-red-500">(*)</span>
            </p>
            <select
              className="w-full rounded-md border p-2 text-sm"
              name="tipoDocumento"
              value={selectDocument}
              onChange={handleChangeSelect}
            >
              <option value="" className="text-sm">
                -- Selecciona un tipo de documento --
              </option>
              <option value="dni" className="text-xs">
                DNI - DOCUMENTO NACIONAL DE IDENTIDAD
              </option>
              <option value="ce" className="text-xs">
                CE - CARNET DE EXTRANJERIA/PASAPORTE
              </option>
            </select>
            {selectDocument === "" ? (
              <span className="text-red-500 text-xs font-semibold flex items-center gap-2 ">
                <FiAlertCircle />
                Complete este dato.
              </span>
            ) : (
              ""
            )}
          </label>
          <label className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm">
              Número de documento <span className="text-red-500">(*)</span>
            </p>
            <input
              className="w-full rounded-md border p-2 text-sm"
              value={documentIdentity}
              onChange={handleChangeDi}
            />
            {documentIdentity.trim() === "" ? (
              <span
                className={`text-red-500 text-xs font-semibold flex items-center gap-2`}
              >
                <FiAlertCircle />
                Complete este dato.
              </span>
            ) : regexDi.test(documentIdentity) ? (
              <span className="text-red-500 text-xs font-semibold flex items-center gap-2">
                <AiFillAlert />
                No debe contener letras o caracteres especiales.
              </span>
            ) : (
              ""
            )}
          </label>
        </div>
        <div className="flex justify-end gap-4 p-6">
          <button
            style={
              isSubmitDisabled
                ? {
                    background: "gray",
                    color: "white",
                    border: "1px solid gray",
                    filter: "blur(1px)",
                  }
                : {
                    background: "#42a5f5",
                    color: "white",
                    border: "1px solid #42a5f5",
                  }
            }
            className="px-5 py-2 rounded-md font-bold"
            onClick={handleClick}
            disabled={isSubmitDisabled}
          >
            Enviar
          </button>
          <button className="px-5 py-2 rounded-md hover:bg-red-200 text-slate-900 font-bold">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
