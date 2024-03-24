import { PrismaClient } from "@prisma/client";

const prisma = await new PrismaClient();

async function changeUserProfile(id, buildingName, description){
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                buildingName: buildingName,
                description: description,
            },
          })
        if(updateUser)
        {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Błąd podczas wprowadzania zmian na profilu:', error);
        return false;
    } 
}

async function changeUserImage(id, image){
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
              image: image,
            },
          })
        if(updateUser)
        {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Błąd podczas zmieniania obrazku w profilu:', error);
        return false;
    } 
}

export {changeUserProfile, changeUserImage};