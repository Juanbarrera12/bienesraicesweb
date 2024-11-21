const bcrypt = require("bcryptjs");

(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  console.log("Contraseña cifrada:", hashedPassword);
})();
