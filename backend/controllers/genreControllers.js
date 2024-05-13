import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/genreModel.js";

export const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim())
      return res.status(400).json({ message: "Name is required" });

    const existingGenre = await Genre.findOne({ name });
    if (existingGenre)
      return res.status(400).json({ message: "Genre existed" });

    const newGenre = await new Genre({ name }).save();
    res.json(newGenre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { genreId } = req.params;

    const genre = await Genre.findOne({ _id: genreId });
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    genre.name = name;
    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const deleted = await Genre.findByIdAndDelete(req.params.genreId);
    res.json({ message: `${deleted.name} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.genreId });
    res.json(genre);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const getGenreslist = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find();
    res.json(all);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
