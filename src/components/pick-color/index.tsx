/***
 * @auth: dmx
 * @time: 2020/7/2
 * @func: 颜色选择组件
 ***/
import React, {
  memo, useMemo,
  useState,
  useCallback,
} from 'react';
import {
  SketchPicker,
  GithubPicker,
  SwatchesPicker,
  TwitterPicker,
  CustomPicker,
  ChromePicker,
} from 'react-color';
import { Popover } from 'antd';

import './index.less';

interface IProps {
  themColor: string;
  onChangeComplete: (color: string) => void;
  type?: string;
  position?: string;
  small?: boolean;
}

const pikers: {
  [key: string]: React.ReactNode,
} = {
  sketch: SketchPicker,
  chrome: ChromePicker,
  github: GithubPicker,
  twitter: TwitterPicker,
  custom: CustomPicker,
  swatches: SwatchesPicker,
};

const PickColor: React.FC<IProps> = (props) => {
  const {
    type = 'sketch',
    position = 'bottom',
    themColor,
    onChangeComplete,
  } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(themColor);

  const Picker: any = pikers[type];

  // 颜色选择的change事件
  const handleChange = () => {

  }
  const handleChangeComplete = (color: any) => {
    onChangeComplete(color.hex);
    setColor(color.hex);
  }
  const handleClosePicker = useCallback(() => {
    setDisplayColorPicker(false);
  }, [displayColorPicker]);

  // 展示色块的点击
  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);


  const { swatch, picker } = useMemo(() => {
    const styles: any = {
      wrapper: {
        position: 'inherit',
        zIndex: 100,
      },
    };
    if( position === 'top' ) {
      styles.wrapper.transform = 'translateY(-100%)';
      styles.wrapper.paddingBottom = 8;
    }

    const swatch = (
      <Popover
        content="更换主题色"
      >
        <div
          className="swatch"
          onClick={handleClick}
        >
          <div className="swatch-color" style={{
            background: color,
          }} />
        </div>
      </Popover>
    )

    const picker = displayColorPicker
      ? (
        <div className="popover">
          <div
            className="cover"
            onClick={handleClosePicker}
          />
          <div
            style={styles.wrapper}
          >
            <Picker
              {...props}
              color={color}
              onChange={handleChange}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        </div>
      )
      : null;

    return {
      swatch,
      picker,
    }

  }, [position, handleClick, color, displayColorPicker, handleChangeComplete]);

  return (
    <div className="pick-color">
      {swatch}
      {picker}
    </div>
  );
};

export default memo(PickColor);
