import React, { ComponentPropsWithoutRef, FC, useMemo } from "react";
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
  const items = useMemo<ComponentPropsWithoutRef<"ul">["children"]>(
    () =>
      voices.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/serifu/${id}`}>
            <a target="_blank">{name}</a>
          </Link>
        </li>
      )),
    []
  );

  return <ul styleName="list">{items}</ul>;
};

export default SerifuList;
