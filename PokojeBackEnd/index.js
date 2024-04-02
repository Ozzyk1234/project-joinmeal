const { register, login } = require('./script/account');
const { createNewRoom, showAllRooms, joinOrExit} = require('./script/room')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: "SECRET_SESSION_KEY", // Sekretny klucz do podpisywania identyfikatora sesji
    resave: false, // Nie zapisuj sesji, jeśli nie została zmieniona
    saveUninitialized: true, // Zapisuj sesję, nawet jeśli nie została zmieniona
    cookie: { secure: false } // Ustawienia ciasteczka sesji
}));

app.get('/form', (req, res) => {
  res.render('form');
});


app.post('/dolacz', async (req, res) => {
  const userId = parseInt(req.body.userId);
  const roomName = req.body.roomName;
  const slots = parseInt(req.body.slots);
  const formattedDate = new Date(req.body.formattedDate);
  const cost = parseFloat(req.body.cost);
  await createNewRoom(userId, roomName, slots, formattedDate, cost)
  res.send(`Przekazano ${userId}, ${roomName}, ${slots}, ${formattedDate}, ${cost}`);
});

app.post('/dolaczDoPokoju', async (req, res) => {
  const userId = parseInt(req.body.userId);
  const roomId = parseInt(req.body.roomId);
  const joined = await joinOrExit(userId,roomId);
  res.send(joined);
});

app.get('/pobierz', async (req, res) => {
  const allRooms = await showAllRooms();
  res.render('view', { allRooms });
});


// Ustawienie wartości w sesji
app.get('/ustaw', (req, res) => {
    req.session.userId = 123;
    res.send(`Wartość została ustawiona w sesji.`);
  });
  

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

async function main() {
    // const registerResult = await register("email@domena.pl", "hasło123", "User");
    // if(registerResult === true){
    //     //Akcje po poprawnym utworzeniu konta
    // }else{
    //     console.error(registerResult || "Wystąpił błąd podczas rejestracji!");
    // }

    // const loginResult = await login("email2@domena.pl", "hasło123");
    // if(loginResult === true){
    //     console.log("Zalogowano pomyślnie");
    // }else{
    //     console.error(loginResult || "Wystąpił błąd podczas logowania!");
    // }


}
main()
