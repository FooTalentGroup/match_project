import { usePet } from "../context/PetContext";

function PetsHome() {
  const { matchedPet, handleClickMeet, mascotas } = usePet();

  return (
    <div className="mx-auto bg-transparent">
      <h2 className="text-3xl md:text-4xl font-bold font-secundary text-primary text-center mt-0">
        Tus mascotas compatibles
      </h2>
      <hr className="w-3/5 border-t-1 border-primary mx-auto mt-4 md:mb-10 mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-1 h-full bg-transparent">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="p-4 items-center text-center">
            <img
              src={mascota.photoUrls[0]}
              alt={mascota.name}
              className="md:w-55 md:h-55 mx-auto object-cover bg-contain md:rounded-[80px] rounded-full hover:scale-105 transition mb-2"
            />
            <div className="flex flex-col md:gap-3 gap-0.5 items-center">
              <div>
                <div className="text-center md:text-2xl md:flex-row flex flex-col text-xl font-normal mt-2 mb-1">
                  <p>{mascota.name},</p> <p>{mascota.sex}</p>
                </div>
                <p className="font-extrabold md:text-[20px] text-lg font-tertiary whitespace-nowrap text-primary">
                  {(() => {
                    let total = 0;
                    const selected = [];

                    for (const trait of mascota.traits) {
                      if (
                        trait.length <= 10 &&
                        total + trait.length <= 20 &&
                        selected.length < 2
                      ) {
                        selected.push(trait);
                        total += trait.length;
                      }
                    }

                    return selected.length > 0
                      ? selected.join(", ")
                      : "Amigable";
                  })()}
                </p>
              </div>
              <div className="flex flex-col mt-2">
              {(!matchedPet || matchedPet.matchStatus === "Aprobado" || matchedPet.matchStatus === "Rechazado") && (
  <button
    onClick={() => handleClickMeet(mascota)}
    className="border border-primary rounded-4xl shadow-lg cursor-pointer md:text-xl text-base px-6 py-2 text-white font-bold bg-primary hover:scale-105 transition"
  >
    Conóceme
  </button>
)}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetsHome;
