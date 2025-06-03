import { useState } from "react";
import PropTypes from "prop-types";

import OnClose from "../../assets/icons/svg-components/OnClose";

import logo from "../../assets/logo.webp";
import CheckIcon from "../../assets/icons/svg-components/CheckIcon";

const opcionesEnergia = ["Tranquilo", "Moderado", "Muy Activo"];
const opcionesCaracter = ["Cariñoso", "Independiente", "Protector", "Juguetón"];
const opcionesPreferencia = ["Con niños", "Con perros", "Con gatos"];

const RegisterModalb = ({ isOpen, onClose, onBack, onFinish, serverError }) => {
  const [formData, setFormData] = useState({
    hasVeterinarian: "",
    allowsVisit: "",
    isResponsibleAdoption: "",
    energy: "",
    character: [],
    compatibility: [],
    termsAccepted: false,
  });
  const [errores, setErrores] = useState({});

  const validateStepTwo = () => {
    const nuevosErrores = {};
    if (!formData.hasVeterinarian)
      nuevosErrores.hasVeterinarian = "Selecciona una opción.";
    if (!formData.allowsVisit)
      nuevosErrores.allowsVisit = "Selecciona una opción.";
    if (!formData.isResponsibleAdoption)
      nuevosErrores.isResponsibleAdoption = "Debes aceptar el compromiso.";
    if (!formData.energy) nuevosErrores.energy = "Selecciona una energía.";
    if (formData.character.length === 0)
      nuevosErrores.character = "Selecciona al menos un carácter.";
    if (formData.compatibility.length === 0)
      nuevosErrores.compatibility = "Selecciona al menos una preferencia.";
    if (!formData.termsAccepted) {
      nuevosErrores.termsAccepted = "Debes aceptar los términos y condiciones.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  if (name === "termsAccepted" && checked) {
    setErrores((prev) => {
      const nuevosErrores = { ...prev };
      delete nuevosErrores.termsAccepted;
      return nuevosErrores;
    });
  }

  };

  const handleEnergySelect = (energy) => {
    setFormData((prev) => ({ ...prev, energy }));
  };

  const toggleSeleccion = (opcion) => {
    setFormData((prev) => ({
      ...prev,
      character: prev.character.includes(opcion)
        ? prev.character.filter((item) => item !== opcion)
        : [...prev.character, opcion],
    }));
  };

  const toggleCompatibility = (opcion) => {
    setFormData((prev) => ({
      ...prev,
      compatibility: prev.compatibility.includes(opcion)
        ? prev.compatibility.filter((item) => item !== opcion)
        : [...prev.compatibility, opcion],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStepTwo()) return;
    onFinish(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] flex items-start justify-center pt-16 pb-8  px-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl p-3 text-[#333333]"
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="text-tertiary focus:outline-none cursor-pointer"
            onClick={onClose}
          >
            <OnClose />
          </button>
        </div>

        <div className="text-center mb-6 mt-1 px-6 sm:px-10 md:px-20">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="mx-auto mb-5 h-24 w-24 sm:h-36 sm:w-auto rounded-full"
          />
          <div className="text-black justify-center text-center text-base sm:text-xl mt-1 mb-4 mx-2 sm:mx-10 md:mx-16">
            Queremos saber
            <strong>
              {" "}
              qué tipo de compañero estás buscando y qué te motiva a adoptar.
            </strong>{" "}
            Así podemos asegurarnos de que haya una buena conexión entre
            ustedes.
          </div>
          <h2 className="md:text-2xl text-xl sm:text-3xl font-bold text-primary mt-1 mb-4">
            Crear Cuenta
          </h2>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#1C1B1F]" />
            <div className="border-t border-[#1C1B1F] w-6" />
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary" />
          </div>
        </div>

        <div className="px-7 md:text-xl text-base text-[#000000]">
          <div className="mb-7">
            <label className="block mb-2 sm:w-150 w-80">
              ¿Estás dispuesto/a llevarlo al veterinario cuando sea necesario?
              (vacunarlo, desparasitarlo regularmente, castrarlo o esterilizar)?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                <span className="text-[#AAAAAA]">Si</span>
                <input
                  type="radio"
                  name="hasVeterinarian"
                  value="true"
                  checked={formData.hasVeterinarian === "true"}
                  onChange={handleChange}
                  className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                />
              </label>
              <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                <span className="text-[#AAAAAA]">No</span>
                <input
                  type="radio"
                  name="hasVeterinarian"
                  value="false"
                  checked={formData.hasVeterinarian === "false"}
                  onChange={handleChange}
                  className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                />
              </label>
            </div>
            {errores.hasVeterinarian && (
              <p className="text-red-600 text-sm mt-1">
                {errores.hasVeterinarian}
              </p>
            )}
          </div>

          <div className="mb-7">
            <label className="block mb-2">
              ¿Estás dispuesto/a recibir una visita o llamado de seguimiento
              después de la adopción?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                <span className="text-[#AAAAAA]">Si</span>
                <input
                  type="radio"
                  name="allowsVisit"
                  value="true"
                  checked={formData.allowsVisit === "true"}
                  onChange={handleChange}
                  className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                />
              </label>
              <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                <span className="text-[#AAAAAA]">No</span>
                <input
                  type="radio"
                  name="allowsVisit"
                  value="false"
                  checked={formData.allowsVisit === "false"}
                  onChange={handleChange}
                  className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                />
              </label>
            </div>
            {errores.allowsVisit && (
              <p className="text-red-500 text-sm mt-1">{errores.allowsVisit}</p>
            )}
          </div>

          <div className="mb-7">
            <label className="block mb-2">
              ¿Estás dispuesto/a firmar un compromiso de adopción responsable?*
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                <span className="text-[#AAAAAA]">Si</span>
                <input
                  type="radio"
                  name="isResponsibleAdoption"
                  value="true"
                  checked={formData.isResponsibleAdoption === "true"}
                  onChange={handleChange}
                  className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                />
              </label>
              <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                <span className="text-[#AAAAAA]">No</span>
                <input
                  type="radio"
                  name="isResponsibleAdoption"
                  value="false"
                  checked={formData.isResponsibleAdoption === "false"}
                  onChange={handleChange}
                  className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                />
              </label>
            </div>
            {errores.isResponsibleAdoption && (
              <p className="text-red-600 text-sm mt-1">
                {errores.isResponsibleAdoption}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              ¿Qué tipo de mascota estás buscando?*
            </label>
            <label className="block font-raleway font-semibold text-black text-[14px] sm:text-[20px] mb-1">
              Energía
            </label>
            <div className="flex flex-wrap gap-1 sm:gap-2 sm:flex-nowrap sm:space-x-2 ">
              {opcionesEnergia.map((energy) => (
                <button
                  key={energy}
                  type="button"
                  onClick={() => handleEnergySelect(energy)}
                  className={`flex items-center px-2.5 sm:px-4 py-1 text-[12px] sm:text-[20px] rounded-full border-2 justify-center gap-1 cursor-pointer ${
                    formData.energy === energy
                      ? "bg-primary text-white border-primary"
                      : "border-primary bg-white/75 text-tertiary"
                  }`}
                >
                  {formData.energy.includes(energy) && <CheckIcon />}
                  {energy}
                </button>
              ))}
            </div>
            {errores.energy && (
              <p className="text-red-600 text-sm">{errores.energy}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block font-semibold mb-1">Carácter</label>
            <div className="flex flex-wrap gap-2">
              {opcionesCaracter.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => toggleSeleccion(opcion)}
                  className={`flex items-center px-4 sm:px-7 py-1 text-[12px] sm:text-[20px] rounded-full justify-center gap-1 border-2 cursor-pointer ${
                    formData.character.includes(opcion)
                      ? "bg-primary text-white border-primary"
                      : "border-primary bg-white/75 text-tertiary"
                  }`}
                >
                  {formData.character.includes(opcion) && <CheckIcon />}
                  {opcion}
                </button>
              ))}
            </div>
            {errores.character && (
              <p className="text-red-600 text-sm">{errores.character}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block font-semibold mb-1">Compatibilidad</label>
            <div className="flex flex-nowrap gap-1 sm:gap-2 sm:flex-nowrap sm:space-x-2 mb-3">
              {opcionesPreferencia.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => toggleCompatibility(opcion)}
                  className={` whitespace-nowrap flex items-center text-[12px] sm:text-[20px] justify-center px-3 sm:px-3 py-1 rounded-full gap-1 border-2 cursor-pointer ${
                    formData.compatibility.includes(opcion)
                      ? "bg-primary text-white border-primary"
                      : "border-primary bg-white/75 text-tertiary"
                  }`}
                >
                  {" "}
                  {formData.compatibility.includes(opcion) && <CheckIcon />}
                  {opcion}
                </button>
              ))}
            </div>
            {errores.compatibility && (
              <p className="text-red-600 text-sm">{errores.compatibility}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-600 text-center mb-4">{serverError}</p>
          )}

          <div className="my-10">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="form-checkbox md:h-5 md:w-5 h-4 w-4 accent-gray-500 rounded cursor-pointer"
              />
              <span className="ml-2 text-[12px] sm:text-[20px] text-[#595146] font-raleway font-medium">
                Acepto los términos y condiciones
              </span>
            </label>
            {errores.termsAccepted && (
              <p className="text-red-600 text-sm mt-1">
                {errores.termsAccepted}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6 gap-14 sm:gap-6">
            <button
              type="button"
              onClick={onBack}
              className="w-[120px] sm:w-[170px] bg-white/75 text-primary font-semibold border-2 border-primary rounded-3xl focus:outline-none cursor-pointer 
               px-6 py-1 text-sm sm:px-12 sm:text-base 
               hover:text-tertiary hover:border-tertiary shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)]"
            >
              Atrás
            </button>

            <button
              type="submit"
              className="w-[120px] sm:w-[170px] bg-primary text-white font-semibold rounded-3xl cursor-pointer 
               px-6 py-1 text-sm sm:px-12 sm:text-base 
               hover:bg-tertiary shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)]"
            >
              Finalizar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RegisterModalb.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  serverError: PropTypes.string,
};

export default RegisterModalb;
