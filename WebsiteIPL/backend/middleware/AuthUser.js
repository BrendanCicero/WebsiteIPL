import Admin from "../models/AdminModel.js";
import Member from "../models/MemberModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda" });
  }
  const admin = await Admin.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
  req.userId = admin.id;
  next();
};

export const verifyWarga = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda" });
  }
  const member = await Member.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
  req.userId = member.userId;
  next();
};
