const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const algorithm = "aes256";
const inputEncoding = "utf8";
const outputEncoding = "hex";
const keyEncoding = "latin1";
const ivlength = 16; // AES blocksize

const { ENCRYPTION_KEY } = require("../utils/config");

const encryptData = catchAsync(async (req, res, next) => {
  const data = req.body.data;
  if (!data) {
    return next(new AppError("No data to encrypt", 400));
  }
  const text = JSON.stringify(data);

  const key = Buffer.from(ENCRYPTION_KEY, keyEncoding); // key must be 32 bytes for aes256
  const iv = crypto.randomBytes(ivlength);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let ciphered = cipher.update(text, inputEncoding, outputEncoding);
  ciphered += cipher.final(outputEncoding);
  const ciphertext = iv.toString(outputEncoding) + ":" + ciphered;

  res.status(200).json({
    ciphertext,
    message: "Data encrpyted successfully",
  });
});

const decryptData = (data) => {
  try {
    const key = Buffer.from(ENCRYPTION_KEY, keyEncoding); // key must be 32 bytes for aes256

    const components = data.split(":");
    const iv_from_ciphertext = Buffer.from(components.shift(), outputEncoding);
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      iv_from_ciphertext
    );
    let deciphered = decipher.update(
      components.join(":"),
      outputEncoding,
      inputEncoding
    );
    deciphered += decipher.final(inputEncoding);

    const decipheredJSON = JSON.parse(deciphered);
    return decipheredJSON;
  } catch (err) {
    throw new AppError("Error in decoding the QRCode", 400);
  }
};

module.exports = { encryptData, decryptData };
