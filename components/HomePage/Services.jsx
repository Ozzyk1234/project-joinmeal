import Image from "next/image";
import { motion } from "framer-motion";
export default function Services() {
  return (
    <>
      <div id="services" className="-mt-40" />
      <div className="w-full h-fit mt-40">
        <h1 className="text-center text-5xl">Usługi</h1>
        <div className="flex md:flex-row flex-col mt-16 w-[80%] mx-auto h-fit justify-between p-9 gap-9">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="-z-1 md:text-2xl text-xl border-[1px] border-gray-400 p-9 h-[200px] bg-white rounded-lg md:w-[28%] w-[100%] flex flex-col justify-center items-center"
          >
            Dołączanie do posiłków
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src={"/checked.png"}
                width={80}
                height={80}
                unoptimized={true}
                className="mt-7"
              />
            </motion.div>
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="-z-1 md:text-2xl text-xl border-[1px] border-gray-400 p-9 h-[200px] bg-white rounded-lg md:w-[28%] w-[100%] flex flex-col justify-center items-center"
          >
            Wyszukiwanie przepisów
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src={"/checked.png"}
                width={80}
                height={80}
                unoptimized={true}
                className="mt-7"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="-z-1 md:text-2xl text-xl border-[1px] border-gray-400 p-9 h-[200px] bg-white rounded-lg md:w-[28%] w-[100%] flex flex-col justify-center items-center"
          >
            Tablica z ogłoszeniami
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src={"/checked.png"}
                width={80}
                height={80}
                unoptimized={true}
                className="mt-7"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
