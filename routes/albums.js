import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const albums = [
  {
    title: "Scoring the End of the World",
    artist: "Motionless in White",
    trackCount: 17,
    releaseYear: 2023,
    id: "8d059921-76dd-4088-8b1f-81e1ad4b5b1c",
  },
  {
    title: "Disguise",
    artist: "Motionless in White",
    trackCount: 11,
    releaseYear: 2019,
    id: "14835870-5109-47d8-82d0-a3adbc6c9ba1",
  },
  {
    title: "Graveyard Shift",
    artist: "Motionless in White",
    trackCount: 12,
    releaseYear: 2017,
    id: "9c6360b1-7758-4835-8fe5-c8fa22aa983e",
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

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { title, trackCount, releaseYear, artist } = req.body;

  const album = albums.find((album) => album.id === id);

  if (album) {
    if (title) {
      album.title = title;
    }
    if (trackCount) {
      album.trackCount = +trackCount;
    }
    if (releaseYear) {
      album.releaseYear = releaseYear;
    }
    if (artist) {
      album.artist = artist;
    }
    res.status(200).send(`Album with the id ${id} updated successfully`);
  } else {
    res.status(404).send({ errorMessage: "No matching album found" });
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
