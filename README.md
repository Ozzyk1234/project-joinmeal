Wprowadzenie
Project JoinMeal to aplikacja zbudowana na frameworku Next.js, używająca różnych bibliotek i narzędzi, aby zapewnić bogatą funkcjonalność i dobre doświadczenie użytkownika.

Instalacja
Aby rozpocząć pracę z projektem, należy najpierw zainstalować wszystkie zależności. Wymagane jest posiadanie zainstalowanego Node.js oraz npm.

Sklonuj repozytorium:

bash
Skopiuj kod
git clone <URL_REPO>
Przejdź do katalogu projektu:

bash
Skopiuj kod
cd project-joinmeal
Zainstaluj zależności:

bash
Skopiuj kod
npm install
Uruchamianie projektu
Aby uruchomić serwer deweloperski, wykonaj następujące polecenie:

bash
Skopiuj kod
npm run dev
Następnie otwórz http://localhost:3000 w przeglądarce, aby zobaczyć działającą aplikację.

Struktura projektu
Główne pliki i katalogi projektu to:

pages/: zawiera strony aplikacji.
public/: zawiera zasoby publiczne, takie jak obrazy i inne pliki statyczne.
styles/: zawiera pliki stylów CSS.
components/: zawiera komponenty React używane w aplikacji.
prisma/: zawiera konfigurację Prisma ORM i migracje bazy danych.
package.json: plik konfiguracyjny npm zawierający zależności i skrypty.
Główne funkcje
Autoryzacja: Projekt używa next-auth do zarządzania autoryzacją użytkowników.
ORM: Prisma ORM do interakcji z bazą danych.
UI/UX: Komponenty React oraz TailwindCSS do stylizacji.
Skrypty
Poniżej znajdują się skrypty zdefiniowane w package.json:

dev: Uruchamia serwer deweloperski.
bash
Skopiuj kod
npm run dev
build: Generuje pliki Prisma, przeprowadza migracje i buduje projekt Next.js.
bash
Skopiuj kod
npm run build
start: Uruchamia zbudowaną aplikację Next.js.
bash
Skopiuj kod
npm run start
lint: Sprawdza kod pod kątem błędów lintera.
bash
Skopiuj kod
npm run lint
postinstall: Generuje pliki Prisma po instalacji zależności.
bash
Skopiuj kod
npm run postinstall
Zależności
Projekt korzysta z wielu zależności, w tym:

@prisma/client: Interfejs klienta Prisma.
next: Framework Next.js.
react i react-dom: Biblioteki React.
tailwindcss: Narzędzie do stylizacji CSS.
next-auth: Biblioteka do autoryzacji w Next.js.
Pełna lista zależności znajduje się w pliku package.json.

Deploy na Vercel
Najłatwiejszym sposobem na wdrożenie aplikacji Next.js jest użycie platformy Vercel, twórców Next.js. Aby wdrożyć aplikację na Vercel, wykonaj poniższe kroki:

Zarejestruj się na Vercel.
Połącz swoje repozytorium z Vercel.
Postępuj zgodnie z instrukcjami na Vercel, aby wdrożyć aplikację.
Więcej informacji na temat wdrażania aplikacji Next.js można znaleźć w dokumentacji Next.js.
