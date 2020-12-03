import Heading2 from "components/atoms/Heading2";
import React, { FC } from "react";
import "./style.module.scss";

const About: FC = () => (
  <div styleName="wrapper">
    <article styleName="article">
      <Heading2>素材のご利用について</Heading2>
      <ul>
        <li>ボイス素材は全て無料でご使用いただけます</li>
        <li>著作権は放棄しておりません</li>
        <li>ボイス素材の再配布はご遠慮ください</li>
        <li>公序良俗に反するサイト、法律に違反する使用はご遠慮ください</li>
        <li>反社会的勢力や違法行為に関わる使用はご遠慮ください</li>
        <li>その他、不適切な使用はご遠慮ください</li>
      </ul>
    </article>
    <article styleName="article">
      <Heading2>リクエスト、お仕事について</Heading2>
      <p>
        ボイス素材のリクエストや、声に関するお仕事を募集しております。
        <br />
        piro.haniwa@gmail.com までお気軽にご連絡ください。
      </p>
    </article>
  </div>
);

export default About;
