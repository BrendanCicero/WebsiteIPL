import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin)
    return res.status(404).json({ msg: "Akun Pengurus tidak ditemukan" });
  const match = await argon2.verify(admin.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password salah" });
  req.session.userId = admin.id;
  const id = admin.id;
  const name = admin.name;
  const provinsi = admin.provinsi;
  const kabkota = admin.kabkota;
  const kecamatan = admin.kecamatan;
  const kelurahan = admin.kelurahan;
  const email = admin.email;
  const role = admin.role;

  res
    .status(200)
    .json({ id, name, provinsi, kabkota, kecamatan, kelurahan, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda" });
  }
  const admin = await Admin.findOne({
    attributes: ["id", "name", "email", "role"],
    where: {
      id: req.session.userId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
  res.status(200).json(admin);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
