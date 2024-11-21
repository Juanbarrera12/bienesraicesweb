const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Simula una base de datos
const users = [
  { id: 1, username: "admin", password: "$2a$10$qK4d2U7Clv1oRJBDi9cfMuim/mhIlmCStxTTmLSW5XRG7how/A5iS", role: "admin" }, // Contraseña: admin123
];

(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10); // Reemplaza "admin123" por tu contraseña
    console.log("Contraseña cifrada:", hashedPassword);
  })();

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Busca el usuario
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  // Verifica la contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

  // Genera el token JWT
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, role: user.role });
};

// Verificación de token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjunta el usuario decodificado al request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
};

// Middleware para admin
exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
