import Bukti from "../models/BuktiModel.js";
import fs from "fs";
import path from "path";

export const getBuktis = async (req, res) => {
  try {
    const response = await Bukti.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBuktiById = async (req, res) => {
  try {
    const response = await Bukti.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createBukti = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Images must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Bukti.create({ name: name, image: fileName, url: url });
      res.status(201).json({ msg: "Bukti Created Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateBukti = async (req, res) => {
  const bukti = await Bukti.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!bukti) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
  if (req.files === null) {
    fileName = Bukti.image;
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

    const filepath = `./public/images/${bukti.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Bukti.update(
      { name: name, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Bukti Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBukti = async (req, res) => {
  const bukti = await Bukti.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!bukti) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${bukti.image}`;
    fs.unlinkSync(filepath);
    await Bukti.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Bukti Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
