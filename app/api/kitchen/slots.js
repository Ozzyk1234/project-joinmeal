// Testowo w liscie, zobacz czy da sie jakis hook ustawic na list i czy samo sie bedzie zmieniac? Podpowiedzi na dole V

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

let list = [];
//let userInKitchenList = [];
//Testowe ponizej zeby was nie pojebalo ze wywala przy kazdym ctrl+s :)
let endTime = new Date();
endTime.setMinutes(endTime.getMinutes() + 300);
let userInKitchenList = [
  {
    idKitchen: 1,
    idUser: 1,
    timeEnd: endTime,
  },
];
//Koniec bloku testowego
async function getKitchenList() {
  if (list.length < 1) {
    await init();
  }
  return list;
}

async function getUserInKitchenList(idKitchen) {
  await updateUserInKitchenList();
  return userInKitchenList.filter((x) => x.idKitchen == idKitchen);
}

async function addUserToKitchen(idKitchen, idUser, time) {
  await removeUserFromKitchen(idUser);
  let endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + time);
  userInKitchenList.push({
    idKitchen: idKitchen,
    idUser: idUser,
    timeEnd: endTime,
  });
}

async function removeUserFromKitchen(idUser) {
  userInKitchenList = userInKitchenList.filter((x) => x.idUser !== idUser);
}

async function updateUserInKitchenList() {
  let currentTime = new Date();
  userInKitchenList = userInKitchenList.filter(
    (event) => event.timeEnd.getTime() > currentTime.getTime()
  );
}

async function init() {
  const allKitchen = await prisma.kitchen.findMany();
  if (allKitchen.length > 0) {
    allKitchen.forEach((kitchen) => {
      list.push(kitchen);
    });
  } else {
    list = [];
    console.error("Brak kuchni!");
  }
}

module.exports = {
  getKitchenList,
  addUserToKitchen,
  getUserInKitchenList,
  removeUserFromKitchen,
};

// Jeśli chcesz zaktualizować widok, gdy zmienia się zawartość userInKitchenList, możesz wykorzystać mechanizmy oferowane przez Next.js, takie jak komponenty Reacta i mechanizmy re-renderowania.

// Oto kilka podejść:

// Użycie stanu lokalnego w komponencie: Jeśli userInKitchenList jest częścią stanu komponentu, to każda zmiana stanu spowoduje ponowne renderowanie komponentu, 
// co automatycznie zaktualizuje widok. Możesz użyć useState do przechowywania userInKitchenList i useEffect, aby wykryć zmiany w tych danych i zaktualizować interfejs użytkownika.

// Użycie globalnego stanu: Jeśli userInKitchenList jest współdzielony między wieloma komponentami, 
// można użyć narzędzi do zarządzania stanem, takich jak Redux lub Context API, aby przechowywać te dane w globalnym stanie. Wtedy zmiana tych danych w jednym komponencie spowoduje automatyczne zaktualizowanie wszystkich komponentów, które korzystają z tych danych.

// Użycie mechanizmów serwerowych: Jeśli userInKitchenList jest uzyskiwane z serwera, na przykład za pomocą żądań API, możesz użyć funkcji getServerSideProps lub getStaticProps do dynamicznego pobierania tych danych przy każdym żądaniu lub generowaniu strony. W ten sposób zapewnisz, że strona zawsze będzie aktualizowana na podstawie najnowszych danych.

// Wybór odpowiedniego podejścia zależy od specyfiki twojej aplikacji i tego, jakie dokładnie chcesz osiągnąć. Jeśli potrzebujesz dalszej pomocy w implementacji, proszę podać więcej szczegółów na temat twojej aplikacji i konkretnego problemu, z którym się zmierzasz.
