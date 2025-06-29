const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));


// HTML үйлчлэх (одоо бүгд нэг файлд багтсан тул index.html л хэрэгтэй)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// POST - бүртгүүлэх
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = { id: Date.now(), firstName, lastName, email, password };

  fs.readFile('data.json', 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (e) {
        users = [];
      }
    }

    // 🧪 Давхардсан email байгаа эсэхийг шалгана
    const duplicate = users.find(u => u.email === email);
    if (duplicate) {
      return res.status(400).send('⚠️ Энэ имэйлээр өмнө нь бүртгүүлсэн байна. Та өөр имэйл ашиглана уу.');
    }

    // Хэрэв давхардал байхгүй бол хадгална
    users.push(newUser);

    fs.writeFile('data.json', JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Хадгалах үед алдаа гарлаа');
      res.status(200).send('ok'); // ← redirect биш, AJAX-д хариу өгч байна
    });

  });
});


// POST - нэвтрэх
app.post('/login', (req, res) => {
  const { UserName, sign_password } = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Өгөгдөл уншихад алдаа гарлаа');

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (e) {
      return res.status(500).send('Өгөгдөл буруу форматтай байна');
    }

    const user = users.find(
      u => u.lastName === UserName && u.password === sign_password
    );

    if (user) {
      res.redirect('https://www.youtube.com/watch?v=CnH3kAXSrmU&t=2169s'); // амжилттай нэвтэрвэл home руу
    } else {
      res.send('Нууц үг эсвэл хэрэглэгчийн нэр буруу байна!');
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Хуудас олдсонгүй');
});

app.listen(PORT, () => {
  console.log(`Server working at http://localhost:${PORT}`);
});
