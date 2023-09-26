import Iuran from "../models/IuranModel.js";
import Admin from "../models/AdminModel.js";
import path from "path";
import fs from "fs";

export const getIurans = async (req, res) => {
  try {
    let response;
    response = await Iuran.findAll({
      attributes: [
        "id",
        "biaya",
        "bulan",
        "tahun",
        "jenis",
        "batasPembayaran",
        "metodePembayaran",
        "tanggalBayar",
        "status",
        "image",
        "url",
        "createdAt",
        "updatedAt",
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

export const getIuranById = async (req, res) => {
  try {
    const iuran = await Iuran.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!iuran) return res.status(404).json({ msg: "Iuran tidak ditemukan" });
    let response;
    response = await Iuran.findOne({
      attributes: [
        "id",
        "biaya",
        "bulan",
        "tahun",
        "jenis",
        "batasPembayaran",
        "metodePembayaran",
        "tanggalBayar",
        "status",
        "image",
        "url",
      ],
      where: {
        id: iuran.id,
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

export const createIuran = async (req, res) => {
  const {
    biaya,
    bulan,
    tahun,
    jenis,
    batasPembayaran,
    metodePembayaran,
    memberId,
  } = req.body;
  try {
    await Iuran.create({
      biaya: biaya,
      bulan: bulan,
      tahun: tahun,
      jenis: jenis,
      batasPembayaran: batasPembayaran,
      metodePembayaran: metodePembayaran,
      userId: req.userId,
      memberId: memberId,
    });
    res.status(201).json({ msg: "Iuran Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateIuran = async (req, res) => {
  const iuran = await Iuran.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!iuran) return res.status(404).json({ msg: "Iuran tidak ditemukan" });

  const {
    biaya,
    bulan,
    tahun,
    jenis,
    batasPembayaran,
    metodePembayaran,
    tanggalBayar,
  } = req.body;
  await Iuran.update(
    {
      biaya,
      bulan,
      tahun,
      jenis,
      batasPembayaran,
      metodePembayaran,
      tanggalBayar,
    },
    {
      where: {
        id: iuran.id,
      },
    }
  );
  res.status(200).json({ msg: "Iuran updated successfully" });
};

export const updateBukti = async (req, res) => {
  const iuran = await Iuran.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!iuran) return res.status(404).json({ msg: "Iuran tidak ditemukan" });

  let fileName = "";
  if (req.files === null) {
    fileName = iuran.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Images must be less than 5 MB" });

    if (iuran.image !== null) {
      const filepath = `./public/images/${iuran.image}`;
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const tanggalBayar = req.body.date;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Iuran.update(
      { tanggalBayar: tanggalBayar, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Iuran Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const iuran = await Iuran.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!iuran) return res.status(404).json({ msg: "iuran tidak ditemukan" });
    const { status } = req.body;
    await Iuran.update(
      {
        status: status,
      },
      {
        where: {
          id: iuran.id,
        },
      }
    );
    res.status(200).json({ msg: "Iuran updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteIuran = async (req, res) => {
  try {
    const iuran = await Iuran.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!iuran) return res.status(404).json({ msg: "Iuran tidak ditemukan" });
    if (req.userId !== iuran.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    // const filepath = `./public/images/${iuran.image}`;
    // fs.unlinkSync(filepath);
    await Iuran.destroy({
      where: {
        id: iuran.id,
      },
    });
    res.status(200).json({ msg: "Iuran deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
