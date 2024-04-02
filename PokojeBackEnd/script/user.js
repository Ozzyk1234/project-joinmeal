const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Tworzenie profilu z domyślnymi wartościami
async function addDefaultProfileToDatabase(idAccount, userName) {
    try {
        const newAccount = await prisma.user.create({
            data: {
                idAccount: idAccount,
                userName: userName,
            },
          });
        if(newAccount)
        {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Błąd podczas dodawania domyślengo profilu do bazy danych:', error);
        return false;
    } finally {
        if (prisma.$isConnected) {
            await prisma.$disconnect();
        }
    }
}

module.exports = {addDefaultProfileToDatabase}