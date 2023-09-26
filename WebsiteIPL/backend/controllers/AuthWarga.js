import Member from "../models/MemberModel.js";
import argon2 from "argon2";

export const LoginWarga = async (req, res) => {
  const member = await Member.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!member)
    return res.status(404).json({ msg: "Akun Warga tidak ditemukan" });
  const match = await argon2.verify(member.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password salah" });
  req.session.userId = member.id;
  const id = member.id;
  const name = member.name;
  const email = member.email;

  res.status(200).json({ id, name, email });
};

export const MeWarga = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda" });
  }
  const member = await Member.findOne({
    attributes: ["id", "name", "email", "status", "isPaid", "userId"],
    where: {
      id: req.session.userId,
    },
  });
  if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
  res.status(200).json(member);
};

export const logOutWarga = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
