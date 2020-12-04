import React, { FC } from "react";
import RcPagination, {
  PaginationProps as RcPaginationProps,
} from "rc-pagination";
import "./style.module.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import locale from "rc-pagination/lib/locale/ja_JP";

export type PaginationProps = Pick<RcPaginationProps, "current" | "total"> & {
  handleChange: RcPaginationProps["onChange"];
};

const Pagination: FC<PaginationProps> = ({ current, handleChange, total }) => (
  <div styleName="wrapper">
    <RcPagination
      className="pagination"
      current={current}
      locale={locale}
      nextIcon={GrFormNext}
      onChange={handleChange}
      pageSize={50}
      prevIcon={GrFormPrevious}
      total={total}
    />
  </div>
);

export default Pagination;
