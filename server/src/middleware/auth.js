const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    //   Ambil dan split
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    // Jika token salah / tidak ada
    if (!token) {
      return res.status(401).send({
        message: "Invalid Token",
      });
    }
    // Secret Key
    const secretKey = process.env.SECRET_KEY;

    // Verifikasi Token
    const verified = jwt.verify(token, secretKey);

    // Jika Berhasil
    req.users = verified;

    // Lanjut
    next();
  } catch (err) {
    //   Kalau error
    console.log(err);
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};