import React, { FC } from "react";
import Link from "next/link";
import "./style.module.scss";

type Voice = {
  id: string;
  name: string;
};

export type SerifuListProps = {
  voices: Voice[];
};

const SerifuList: FC<SerifuListProps> = ({ voices }) => {
  return (
    <ul styleName="list">
      {voices.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/serifu/${id}`}>
            <a target="_blank">{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SerifuList;
