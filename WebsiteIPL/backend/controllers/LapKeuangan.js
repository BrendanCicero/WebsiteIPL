import LapKeuangan from "../models/LapKeuanganModel.js";
import Admin from "../models/AdminModel.js";

export const getLapKeuangans = async (req, res) => {
  try {
    let response;
    response = await LapKeuangan.findAll({
      attributes: [
        "id",
        "kategori",
        "keterangan",
        "name",
        "tanggal",
        "nominal",
      ],
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

export const getLapKeuanganById = async (req, res) => {
  try {
    const lapKeuangan = await LapKeuangan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!lapKeuangan)
      return res.status(404).json({ msg: "Lap Keuangan tidak ditemukan" });
    let response;
    response = await LapKeuangan.findOne({
      attributes: [
        "id",
        "kategori",
        "keterangan",
        "name",
        "tanggal",
        "nominal",
      ],
      where: {
        id: lapKeuangan.id,
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

export const createLapKeuangan = async (req, res) => {
  const { kategori, keterangan, name, tanggal, nominal } = req.body;
  try {
    await LapKeuangan.create({
      kategori: kategori,
      keterangan: keterangan,
      name: name,
      tanggal: tanggal,
      nominal: nominal,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Lap Keuangan Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateLapKeuangan = async (req, res) => {
  try {
    const lapKeuangan = await LapKeuangan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!lapKeuangan)
      return res.status(404).json({ msg: "Lap Keuangan tidak ditemukan" });
    const { kategori, keterangan, name, tanggal, nominal } = req.body;
    if (req.userId !== lapKeuangan.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    await LapKeuangan.update(
      {
        kategori,
        keterangan,
        name,
        tanggal,
        nominal,
      },
      {
        where: {
          id: lapKeuangan.id,
        },
      }
    );
    res.status(200).json({ msg: "Lap Keuangan updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
