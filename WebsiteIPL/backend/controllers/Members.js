import Member from "../models/MemberModel.js";
import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const getMembers = async (req, res) => {
  try {
    let response;
    response = await Member.findAll({
      attributes: ["id", "name", "norumah", "status", "isPaid"],
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: Admin,
          attributes: ["name", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
    let response;
    response = await Member.findOne({
      attributes: ["id", "name", "norumah", "status", "isPaid"],
      where: {
        id: member.id,
      },
      include: [
        {
          model: Admin,
          attributes: ["name", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMember = async (req, res) => {
  const { name, norumah, email, password } = req.body;
  const hashPassword = await argon2.hash(password);
  try {
    await Member.create({
      name: name,
      norumah: norumah,
      email: email,
      password: hashPassword,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Member Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
    const { name, norumah, email, password, confPassword } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = member.password;
    } else {
      hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Konfirmasi Password tidak cocok" });
    await Member.update(
      {
        name: name,
        norumah: norumah,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: member.id,
        },
      }
    );
    res.status(200).json({ msg: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
    const { status, isPaid } = req.body;
    await Member.update(
      {
        status: status,
        isPaid: isPaid,
      },
      {
        where: {
          id: member.id,
        },
      }
    );
    res.status(200).json({ msg: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
    if (req.userId !== member.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    await Member.destroy({
      where: {
        id: member.id,
      },
    });
    res.status(200).json({ msg: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
