import React, { ComponentPropsWithoutRef, FC, useMemo } from "react";
import Link from "next/link";
import "./style.module.scss";
import Pagination, { PaginationProps } from "components/molecules/Pagination";

type Voice = {
  id: string;
  name: string;
};

export type TopProps = Pick<
  PaginationProps,
  "current" | "handleChange" | "total"
> & {
  voices: Voice[];
};

const Top: FC<TopProps> = ({ current, handleChange, total, voices }) => {
  const items = useMemo<ComponentPropsWithoutRef<"ul">["children"]>(
    () =>
      voices.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/serifu/${id}`}>
            <a>
              <div styleName="item">{name}</div>
            </a>
          </Link>
        </li>
      )),
    [voices]
  );

  return (
    <div styleName="wrapper">
      <Pagination current={current} handleChange={handleChange} total={total} />
      <ul styleName="list">{items}</ul>
      <Pagination current={current} handleChange={handleChange} total={total} />
    </div>
  );
};

export default Top;
