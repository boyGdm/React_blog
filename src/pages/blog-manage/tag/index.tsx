/***
 * @auth: dmx
 * @time: 2020/6/20
 * @func:
 ***/
import React, {memo} from 'react';

interface IProps {

}

const Tag: React.FC<IProps> = (props) => {

  return (
    <div>
      博客 Dashboard 标签列表
    </div>
  );
};

export default memo(Tag);
