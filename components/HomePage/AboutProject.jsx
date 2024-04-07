import Image from "next/image";
import { motion, useScroll } from "framer-motion";

export default function AboutProject() {
  return (
    <>
      <div id="aboutproject" className="-mt-36 md:-mt-40" />
      <div className="w-full h-fit md:mt-40 relative overflow-x-hidden">
        <h1 className="text-center text-5xl">O projekcie</h1>

        <div className="flex md:flex-row flex-col md:w-[80%] mx-auto h-fit mt-16 justify-between gap-32 p-16">
          <div className="md:w-[50%] mx-auto text-justify">
            <motion.p
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-md"
            >
              JoinMeal to niezwykła aplikacja, która narodziła się z pasji do
              wspólnego gotowania i dzielenia się smakiem z innymi. Dzięki niej
              możesz stworzyć niezapomniane chwile przy stole, łącząc się z
              przyjaciółmi oraz nowymi znajomymi w atmosferze kulinarnego
              współdzielenia. Ta platforma nie tylko ułatwia planowanie i
              organizowanie spotkań kulinarne, ale także inspiruje do
              eksperymentowania w kuchni i odkrywania nowych smaków. Wszystko to
              sprawia, że JoinMeal staje się sercem kreatywności, współpracy i
              satysfakcji z jedzenia, które można podzielić się z innymi.
              Przenosi doświadczenie kulinarnych przygód na zupełnie nowy
              poziom. Zrodzona z pasji do smaku i chęci dzielenia się nim z
              innymi, staje się miejscem, gdzie wspólne gotowanie staje się
              prawdziwą ceremonią, a spożywanie posiłków – niezapomnianym
              wydarzeniem. To nie tylko narzędzie do planowania spotkań
              kulinarnej wspólnoty, ale przede wszystkim oaza dla tych, którzy
              szukają inspiracji, chcą eksperymentować w kuchni i dzielić się
              swoimi kulinarznymi pasjami.
            </motion.p>
          </div>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-[50%] mx-auto my-auto"
          >
            <Image
              src={"/chef.png"}
              alt={"Chef-Image"}
              priority
              width={700}
              height={500}
            />
          </motion.div>
        </div>
        <div className="flex md:flex-row flex-col md:w-[80%] mx-auto h-fit mt-16 justify-between gap-32 p-16">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-[50%] mx-auto"
          >
            <Image
              src={"/people.png"}
              alt={"Young-People"}
              priority
              width={700}
              height={500}
              className="hidden md:inline"
            />
          </motion.div>
          <div className="md:w-[50%] mx-auto text-justify">
            <motion.p
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-md -mt-56 md:-mt-0"
            >
              JoinMeal to więcej niż tylko aplikacja – to idea, która łączy
              ludzi wokół stołu, by razem odkrywać smakowe tajemnice i kreować
              niepowtarzalne doznania kulinarne. To miejsce, gdzie każdy może
              poczuć się jak mistrz kuchni, dzieląc się swoimi ulubionymi
              przepisami, pomysłami i technikami gotowania z innymi członkami
              społeczności. To także szansa na nawiązanie nowych znajomości,
              wymianę doświadczeń i odkrywanie różnorodności kulinarnego świata.
              W JoinMeal kreatywność, współpraca i radość z jedzenia łączą się w
              harmonijną całość, tworząc wyjątkową atmosferę, która przyciąga i
              inspiruje. To serce kulinarnego świata, które bije w rytm smaku i
              przyjemności z jedzenia, gotowania i dzielenia się tym
              doświadczeniem z innymi. Dołącz do JoinMeal i pozwól swojej pasji
              kulinarnej rozkwitnąć wraz z nami!
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
}
