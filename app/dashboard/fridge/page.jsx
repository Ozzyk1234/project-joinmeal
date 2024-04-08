"use client";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import CreateProduct from "./CreateProduct.jsx";
import { MdClose } from "react-icons/md";
import { Toaster, toast } from "sonner";

const Fridge = () => {
  const [products, setProducts] = useState([]);
  const [checkPush, setCheckPush] = useState(false);
  const { data: session } = useSession();

  const [isCreateMode, setCreateMode] = useState(false);
  const handleClose = async () => {
    setCreateMode(false);
  };
  const handleOpen = async () => {
    setCreateMode(true);
  };
  const handleDeleteProduct = (id) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fridge/removeItem/${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:");
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await fetch(
            `/api/fridge/showallitems/${session.user.id}`
          );
          const data = await response.json();
          setProducts(data);
          setCheckPush(true);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const checkExpiryDates = () => {
      if (products.length > 0) {
        products.forEach((product) => {
          const expiryDateTime = new Date(product.expiryDate).getTime();
          const currentTime = Date.now();

          const differenceInMilliseconds = expiryDateTime - currentTime;
          const differenceInDays =
            differenceInMilliseconds / (1000 * 60 * 60 * 24);
          const date = new Date(product.expiryDate).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );

          if (differenceInDays <= 3) {
            toast.error(
              `Mija/minął termin ważności produktu: ${product.name} ${date}`
            );
          }
        });
      }
    };

    if (checkPush) {
      checkExpiryDates();
    }
  }, [products, checkPush]);

  return (
    <DashboardLayout>
      <Toaster />

      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col">
        {isCreateMode ? (
          <div>
            <h1 className="text-4xl text-center mt-16">Dodaj produkt</h1>
            <CreateProduct onClose={handleClose} />
          </div>
        ) : (
          <div>
            <div className="flex flex-row w-full h-fit items-center justify-end gap-2 pr-7">
              <button
                onClick={handleOpen}
                className="rounded-lg text-white bg-[#0A390C] py-2 px-3"
              >
                Dodaj produkt
              </button>
            </div>
            <h1 className="text-4xl text-center mt-9">Produkty w lodówce:</h1>
            {products.length > 0 && (
              <ul className="flex flex-col mt-8 text-lg items-center justify-center w-full">
                {products.map((product, index) => (
                  <li
                    key={product.id}
                    className={`relative w-full py-2 text-left px-4 ${
                      index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                    }  md:w-[26rem] lg:w-[30rem] xl:w-[40rem]`}
                  >
                    {product.name}{" "}
                    {new Date(product.expiryDate).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                    <MdClose
                      className="absolute top-[15%] right-5 text-red-500 cursor-pointer"
                      size={30}
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Fridge;
