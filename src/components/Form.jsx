import { useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import jsPDF from "jspdf";
import validator from "validator";

const Form = ({ onShowRegistered, pdfGenerated }) => {
  const [nameInput, setNameInput] = useState("");
  const [documentIdentity, setDocumentIdentity] = useState("");
  const [selectDocument, setSelectDocument] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const date = new Date();
  const regex = /[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
  const regexDi = /[a-z!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
  const patron = /^[A-Za-z0-9\s,.-]+$/;
  const valiEmail = validator.isEmail(email);

  const handleChangeName = (eve) => {
    const newNameInput = eve.target.value;
    setNameInput(newNameInput);
    validateForm(
      newNameInput,
      selectDocument,
      documentIdentity,
      direccion,
      telephone,
      email
    );
  };

  const handleChangeDi = (eve) => {
    const newDocumentIdentity = eve.target.value;
    setDocumentIdentity(newDocumentIdentity);
    validateForm(
      nameInput,
      newDocumentIdentity,
      selectDocument,
      direccion,
      telephone,
      email
    );
  };

  const handleChangeSelect = (eve) => {
    const newSelectDocument = eve.target.value;
    setSelectDocument(newSelectDocument);
    validateForm(
      nameInput,
      newSelectDocument,
      documentIdentity,
      direccion,
      telephone,
      email
    );
  };

  const handleChangeDireccion = (eve) => {
    const newAddres = eve.target.value;
    setDireccion(newAddres);
    validateForm(
      nameInput,
      newAddres,
      documentIdentity,
      selectDocument,
      telephone,
      email
    );
  };

  const handleTelephone = (eve) => {
    const newTelephone = eve.target.value;
    setTelephone(newTelephone);
    validateForm(
      nameInput,
      direccion,
      documentIdentity,
      newTelephone,
      selectDocument,
      email
    );
  };

  const handleEmail = (eve) => {
    const newEmail = eve.target.value;
    setEmail(newEmail);
    validateForm(
      nameInput,
      direccion,
      documentIdentity,
      email,
      telephone,
      selectDocument
    );
  };

  const validateForm = (
    newNameInput,
    newSelectDocument,
    newDocumentIdentity,
    newAddres,
    newEmail,
    newTelephone
  ) => {
    const isNameValid = newNameInput.trim() !== "" && !regex.test(newNameInput);
    const isSelectedDocumentValid = newSelectDocument !== "";
    const isDocumentValid = newDocumentIdentity !== "";
    const isAddressValid = newAddres.trim() !== "" && patron.test(direccion);
    const isTelephoneValid =
      newTelephone.trim() !== "" && regexDi.test(newTelephone);
    const isEmailValid = newEmail.trim() !== "" && valiEmail;
    setIsSubmitDisabled(
      !(
        isNameValid &&
        isSelectedDocumentValid &&
        isDocumentValid &&
        isAddressValid &&
        isTelephoneValid &&
        isEmailValid
      )
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
    doc.text("Hoja de Reclamaciones", 80, 10);
    doc.text(
      `Fecha de reclamo: ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
      10,
      20
    );
    doc.setFont("helvetica");
    doc.setFontSize(12);
    doc.text("Datos Generales", 10, 30);
    doc.text("Comercio, Servicios Integrales y Tecnologias S.A.C.", 10, 40);
    doc.text("RUC: 20568033354", 10, 50);
    doc.text(
      "Jr. Manuel Irribaren Nro. 935 Int. F Lima Lima - Surquillo",
      10,
      60
    );
    doc.text("Tus Datos", 10, 90);
    doc.setDrawColor(0);
    doc.line(10, 91, 30, 91);
    doc.text("Nombres y Apellidos: " + nameInput, 10, 100);
    doc.text("Tipo de documento: " + selectDocument, 10, 110);
    doc.text("Número de documento: " + documentIdentity, 10, 120);
    doc.text("Domicilio: " + direccion, 10, 130);
    doc.text("Celular: " + telephone, 10, 140);
    doc.text("E-mail: " + email, 10, 150);

    onShowRegistered(nameInput, doc);
  };

  return (
    <div className="lg:w-1/2 md:w-[5%] sm:w-3/4 bg-white rounded-md shadow-md flex flex-col p-6 gap-6 font-poppin">
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
      <form className="">
        <div className="flex flex-col flex-nowrap gap-8">
          <h3 className="text-lg font-semibold">Tus Datos</h3>
          <label className="flex flex-col gap-2 relative ">
            <p className="text-slate-700 text-sm">
              Nombres y Apellidos{" "}
              <span className="text-red-500 font-bold">*</span>
            </p>
            <input
              className="w-full rounded-md border  p-2 text-sm shadow-sm"
              value={nameInput}
              onChange={handleChangeName}
            />
            {nameInput.trim() === "" ? (
              ""
            ) : regex.test(nameInput) ? (
              <span className="text-red-500 text-[10px] absolute top-[7em] flex items-center gap-2">
                <AiFillAlert />
                No debe contener números o caracteres especiales.
              </span>
            ) : (
              ""
            )}
          </label>
          <div className="grid items-center grid-cols-2 gap-10">
            <label className="flex flex-col gap-2 w-full">
              <p className="text-slate-700 text-sm">
                Tipo de documento{" "}
                <span className="text-red-500 font-bold">*</span>
              </p>
              <select
                className="w-full rounded-md border p-2 text-sm shadow-sm"
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
            </label>
            <label className="flex flex-col gap-2 w-full relative">
              <p className="text-slate-700 text-sm">
                Número de documento{" "}
                <span className="text-red-500 font-bold">*</span>
              </p>
              <input
                className="w-full rounded-md border p-2 text-sm shadow-sm"
                value={documentIdentity}
                onChange={handleChangeDi}
              />
              {regexDi.test(documentIdentity) ? (
                <span className="text-red-500 text-[10px] absolute top-[7em] flex items-center gap-2">
                  <AiFillAlert />
                  No debe contener letras o caracteres especiales.
                </span>
              ) : (
                ""
              )}
            </label>
          </div>
          <label className="flex flex-col gap-2 relative">
            <p className="text-slate-700 text-sm">
              Domicilio <span className="text-red-500 font-bold">*</span>
            </p>
            <input
              className="w-full rounded-md border p-2 text-sm shadow-sm"
              value={direccion}
              onChange={handleChangeDireccion}
            />
            {direccion.trim() === "" ? (
              ""
            ) : patron.test(direccion) === false ? (
              <span className="text-red-500 text-[10px] absolute top-[7em] flex items-center gap-2">
                <AiFillAlert />
                No debe contener caracteres especiales.
              </span>
            ) : (
              ""
            )}
          </label>
          <label className="flex flex-col gap-2 relative">
            <p className="text-slate-700 text-sm">
              Celular <span className="text-red-500 font-bold">*</span>
            </p>
            <input
              className="w-full rounded-md border p-2 text-sm shadow-sm"
              value={telephone}
              onChange={handleTelephone}
            />
            {telephone.trim() === "" ? (
              ""
            ) : regexDi.test(telephone) ? (
              <span className="text-red-500 text-[10px] absolute top-[7em] flex items-center gap-2">
                <AiFillAlert />
                No debe contener letras o caracteres especiales.
              </span>
            ) : (
              ""
            )}
          </label>
          <label className="flex flex-col gap-2 relative">
            <p className="text-slate-700 text-sm">
              E-mail <span className="text-red-500 font-bold">*</span>
            </p>
            <input
              className="w-full rounded-md border p-2 text-sm shadow-sm"
              value={email}
              onChange={handleEmail}
            />
            {email.trim() === "" ? (
              ""
            ) : valiEmail ? (
              ""
            ) : (
              <span className="text-red-500 text-[10px] absolute top-[7em] flex items-center gap-2">
                <AiFillAlert />
                La dirección de correo electrónico no es válida.
              </span>
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
