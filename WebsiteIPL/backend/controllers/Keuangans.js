import Keuangan from "../models/KeuanganModel.js";
import Admin from "../models/AdminModel.js";

export const getKeuangans = async (req, res) => {
  try {
    let response;
    response = await Keuangan.findAll({
      attributes: ["id", "bulan", "tahun"],
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

export const getKeuanganById = async (req, res) => {
  try {
    const keuangan = await Keuangan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!keuangan)
      return res.status(404).json({ msg: "Keuangan tidak ditemukan" });
    let response;
    response = await Keuangan.findOne({
      attributes: ["id", "bulan", "tahun"],
      where: {
        id: keuangan.id,
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

export const createKeuangan = async (req, res) => {
  const { bulan, tahun } = req.body;
  try {
    await Keuangan.create({
      bulan: bulan,
      tahun: tahun,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Keuangan Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKeuangan = async (req, res) => {
  try {
    const keuangan = await Keuangan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!keuangan)
      return res.status(404).json({ msg: "Keuangan tidak ditemukan" });
    const { bulan, tahun, kategori, keterangan, tanggal, nominal } = req.body;
    if (req.userId !== keuangan.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    await Keuangan.update(
      {
        bulan,
        tahun,
        kategori,
        keterangan,
        tanggal,
        nominal,
      },
      {
        where: {
          id: keuangan.id,
        },
      }
    );
    res.status(200).json({ msg: "Keuangan updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKeuangan = async (req, res) => {
  try {
    const keuangan = await Keuangan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!keuangan)
      return res.status(404).json({ msg: "Keuangan tidak ditemukan" });
    if (req.userId !== keuangan.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    await Keuangan.destroy({
      where: {
        id: keuangan.id,
      },
    });
    res.status(200).json({ msg: "Keuangan deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
