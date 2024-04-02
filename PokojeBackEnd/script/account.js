const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const { addDefaultProfileToDatabase } = require('./user')
/* Tworzenie konta - rejestracja
Przykład użycia:

    const registerResult = await register("email@domena.pl", "hasło123", "User");
    if(registerResult === true){
        //Akcje po poprawnym utworzeniu konta
    }else{
        console.error(registerResult || "Wystąpił błąd podczas rejestracji");
    }

*/
async function register(email, password, userName) {
    const validationEmailResult = await validateEmail(email);
    if (validationEmailResult !== true) {
        return validationEmailResult;
    }

    const checkEmailFromDatabaseResult = await checkEmailFromDatabase(email);
    if(checkEmailFromDatabaseResult === true)
    {
        return "Konto o podanym adresie email już istnieje!";
    }

    const validationPasswordResult = await validatePassword(password);
    if (validationPasswordResult !== true) {
        return validationPasswordResult;
    }

    const hashedPassword = await generateHashedPassword(password);
    if(hashedPassword === false)
    {
        return false;
    }

    const addAccountToDatabaseResult = await addAccountToDatabase(email, hashedPassword);
    if(addAccountToDatabaseResult === false)
    {
        return false;
    }
    const idAccount = addAccountToDatabaseResult;
    const addDefaultProfileToDatabaseResult = addDefaultProfileToDatabase(idAccount, userName);
    
    if(addDefaultProfileToDatabaseResult === false)
    {
        return false;
    }

  return true;
}

async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "To nie jest poprawny adres email!";
    }
    return true;
}

async function checkEmailFromDatabase(email) {
    try {
        const findAccountResult = await prisma.account.findUnique({
            where: {
                email: email,
            },
        });
        if(findAccountResult)
        {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Błąd podczas sprawdzania czy w bazie danych występuje adres email:', error);
        return false;
    } finally {
        if (prisma.$isConnected) {
            await prisma.$disconnect();
        }
    }
}

async function validatePassword(password) {
    if (!(password.length >= 8)) {
        return "Hasło jest za krótkie!";
    }

    return true;
}

async function generateHashedPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Błąd podczas szyfrowania hasła: ", error);
        return "Błąd podczas szyfrowania hasła"
    }
}

async function addAccountToDatabase(email,hashedPassword) {
    try {
        const newAccount = await prisma.account.create({
            data: {
                email: email,
                password: hashedPassword,
            },
          });
        if(newAccount)
        {
            return newAccount.id;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Błąd podczas dodawania konta do bazy danych:', error);
        return false;
    } finally {
        if (prisma.$isConnected) {
            await prisma.$disconnect();
        }
    }
}


/* Logowanie na konto
Przykład użycia:

    const loginResult = await login("email@domena.pl", "hasło123");
    if(loginResult === true){
        console.log("Zalogowano pomyślnie");
    }else{
        console.error(loginResult || "Wystąpił błąd podczas logowania!");
    }

*/

async function login(email, password) {
    const validationEmailResult = await validateEmail(email);
    if (validationEmailResult !== true) {
        return validationEmailResult;
    }
  
    const validationPasswordResult = await validatePassword(password);
    if (validationPasswordResult !== true) {
        return validationPasswordResult;
    }
  
    const getPasswordByEmailResult = await getPasswordByEmail(email);
    if (getPasswordByEmailResult === false) {
        return "Błędny adres email lub hasło!";
    }

    const checkPasswordResult = await checkPassword(password, getPasswordByEmailResult);
    if (!checkPasswordResult) {
        return "Błędny adres email lub hasło!";
    }
  
    return true;
  }
  
async function getPasswordByEmail(email) {
    try {
        const user = await prisma.account.findUnique({
            where: {
            email: email,
        },
        select: {
            password: true,
        },
      });

        if (user) {
            return user.password;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Błąd podczas pobierania hasła z bazy danych:', error);
        return false;
    } finally {
        if (prisma.$isConnected) {
            await prisma.$disconnect();
        }
    }
}
  
async function checkPassword(userPassword, hashedPasswordFromDatabase) {
    try {
        const result = await bcrypt.compare(userPassword, hashedPasswordFromDatabase);
        return result;
    } catch (error) {
        console.error('Błąd podczas porównywania haseł:', error);
        return false;
    }
}

module.exports = {register, login};