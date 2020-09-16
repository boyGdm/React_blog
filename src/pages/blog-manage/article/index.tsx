/***
 * @auth: dmx
 * @time: 2020/6/20
 * @func:
 ***/
import React, {memo} from 'react';

interface IProps {

}

const Article: React.FC<IProps> = (props) => {

  return (
    <div>
      文章列表页
    </div>
  );
};

export default memo(Article);