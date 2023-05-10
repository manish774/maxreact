import React from "react";
import { musicList } from "../utils/Musiclist";
import Audiocontrol from "./Audiocontrol";
import classes from "./MusicList.module.css";

const MusicList = () => {
  const songs = musicList.map((song) => (
    <ul className={classes.listnone}>
      <li>
        <Audiocontrol src={song.src} />
      </li>
      <li>
        <div>{song.name}</div>
      </li>
      <li>
        <div>{song.artist}</div>
      </li>
    </ul>
  ));
  return <div>{songs}</div>;
};

export default MusicList;
