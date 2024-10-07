import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const albums = [
  {
    id: 1,
    title: "Scoring the End of the World",
    artist: "Motionless in White",
    trackCount: 17,
    releaseYear: 2023,
  },
  {
    id: 2,
    title: "Disguise",
    artist: "Motionless in White",
    trackCount: 11,
    releaseYear: 2019,
  },
  {
    id: 3,
    title: "Graveyard Shift",
    artist: "Motionless in White",
    trackCount: 12,
    releaseYear: 2017,
  },
];

router.get("/", (req, res) => {
  res.send(albums);
});

router.get("/title/:title", (req, res) => {
  const { title } = req.params;
  const foundAlbum = albums.find((album) => album.title === title);

  if (foundAlbum) {
    res.status(200).send(foundAlbum);
  } else {
    res.status(200).send({ errorMessage: "Album not found" });
  }
});

router.get("/id/:id", (req, res) => {
  const { id } = req.params;
  const foundAlbum = albums.find((album) => album.id === id);

  if (foundAlbum) {
    res.status(200).send(foundAlbum);
  } else {
    res.status(200).send({ errorMessage: "Album not found" });
  }
});

router.post("/", (req, res) => {
  const album = req.body;
  albums.push({ ...album, id: uuidv4() });

  res.status(200).send(`${album.title} has been added`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  albums = albums.filter((album) => album.id !== id);
  res.send(200).send(`${id} deleted successfully`);
});

export default router;
