const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true
}));

// HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth.html'));
});

app.get('/admin.html', (req, res) => {
  if (req.session.isAdmin) {
    res.sendFile(path.join(__dirname, 'admin.html'));
  } else {
    res.status(403).send('newtreh erhgui');
  }
});

//  Register
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = { id: Date.now(), firstName, lastName, email, password };

  fs.readFile('data.json', 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      try { users = JSON.parse(data); } catch { users = []; }
    }

    const duplicate = users.find(u => u.email === email);
    if (duplicate) return res.status(400).send('email burtgeltei baina');

    users.push(newUser);
    fs.writeFile('data.json', JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('hadaglah aldaa');
      res.status(200).send('ok');
    });
  });
});

//  Login
app.post('/login', (req, res) => {
  const { UserName, sign_password } = req.body;

  if (UserName.toLowerCase() === 'admin' && sign_password === 'admin123') {
    req.session.isAdmin = true;
    return res.redirect('/admin.html');
  }

  fs.readFile('data.json', 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      try { users = JSON.parse(data); } catch {}
    }

    const user = users.find(u => u.lastName === UserName && u.password === sign_password);
    if (user) {
      return res.redirect('https://www.youtube.com/watch?v=CnH3kAXSrmU');
    } else {
      return res.send('nuuts ug eswel hereglegchiin ner buruu baina');
    }
  });
});

//  Get all users (admin only)
app.get('/users', (req, res) => {
  if (!req.session.isAdmin) return res.status(403).send('Admin required');

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('aldaa');
    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch {
      res.status(500).send('unshhad aldaa');
    }
  });
});

//  Delete user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile('data.json', 'utf8', (err, data) => {
    let users = JSON.parse(data || '[]');
    users = users.filter(u => u.id !== id);
    fs.writeFile('data.json', JSON.stringify(users, null, 2), () => {
      res.sendStatus(200);
    });
  });
});

//  Update user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    let users = JSON.parse(data || '[]');
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updated };
      fs.writeFile('data.json', JSON.stringify(users, null, 2), () => {
        res.sendStatus(200);
      });
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Logout admin
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('hudas oldsongui');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
