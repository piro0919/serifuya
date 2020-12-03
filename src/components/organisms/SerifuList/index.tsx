/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ComponentPropsWithoutRef, FC, useMemo } from "react";
import Link from "next/link";
import "./style.module.scss";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";

type Voice = {
  id: string;
  name: string;
};

export type SerifuListProps = Pick<Props, "dataLength" | "next"> & {
  voices: Voice[];
};

const SerifuList: FC<SerifuListProps> = ({ dataLength, next, voices }) => {
  const items = useMemo<ComponentPropsWithoutRef<"ul">["children"]>(
    () =>
      voices.map(({ id, name }) => (
        <div key={id}>
          <Link href={`/serifu/${id}`}>
            <a>
              <div styleName="item">{name}</div>
            </a>
          </Link>
        </div>
      )),
    [voices]
  );

  return (
    <div styleName="wrapper">
      <InfiniteScroll
        className="infinite-scroll"
        dataLength={dataLength}
        hasMore={true}
        loader={null}
        next={next}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
};

export default SerifuList;
