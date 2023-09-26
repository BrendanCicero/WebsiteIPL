import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const getAdmins = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const {
    name,
    provinsi,
    kabkota,
    kecamatan,
    kelurahan,
    email,
    password,
    confPassword,
    role,
  } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Konfirmasi Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await Admin.create({
      name: name,
      provinsi: provinsi,
      kabkota: kabkota,
      kecamatan: kecamatan,
      kelurahan: kelurahan,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
  const {
    name,
    provinsi,
    kabkota,
    kecamatan,
    kelurahan,
    email,
    password,
    confPassword,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Admin.update(
      {
        name: name,
        provinsi: provinsi,
        kabkota: kabkota,
        kecamatan: kecamatan,
        kelurahan: kelurahan,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: admin.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
  try {
    await Admin.destroy({
      where: {
        id: admin.id,
      },
    });
    res.status(200).json({ msg: "Admin Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
