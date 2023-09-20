/* eslint-disable react/no-string-refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useRef, useState, useCallback, useMemo } from "react";
import { I18nManager, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import tinycolor from "tinycolor2";
import Slider from "@react-native-community/slider";

import { createPanResponder, HsvColor, IPickerProps, Point2D } from "./util";

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    paddingTop: "100%",
    position: "relative",
  },
  pickerContainerInner: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  pickerImage: {
    width: "100%",
    height: "100%",
  },
  pickerIndicator: {
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  selectedPreview: {
    position: "absolute",
    borderLeftWidth: 0,
  },
  originalPreview: {
    position: "absolute",
    borderRightWidth: 0,
  },
  selectedFullPreview: {
    position: "absolute",
  },
  pickerAlignment: {
    alignItems: "center",
  },
});

type SliderProps = {
  onValueChange?: (value: number) => void;
  value?: number;
};

type MakeComputedStyles = {
  pickerSize: number;
  indicatorColor: string;
  selectedColor: string;
  oldColor: string | undefined;
  angle: number;
  isRTL: boolean;
};

export interface IHoloPickerProps extends IPickerProps {
  state?: {
    color: HsvColor;
    setColor: (props: HsvColor) => void;
  };
  sliderComponent?: React.Component<SliderProps>;
}

export type IHoloPickerState = {
  color: HsvColor;
  pickerSize: number | null;
};

const makeComputedStyles = ({
  indicatorColor,
  selectedColor,
  oldColor,
  angle,
  pickerSize,
  isRTL,
}: MakeComputedStyles) => {
  const summarySize = 0.5 * pickerSize;
  const indicatorPickerRatio = 42 / 410; // computed from picker image
  const indicatorSize = indicatorPickerRatio * pickerSize;
  const pickerPadding = indicatorSize / 3;
  const indicatorRadius = pickerSize / 2 - indicatorSize / 2 - pickerPadding;
  const mx = pickerSize / 2;
  const my = pickerSize / 2;
  const dx = Math.cos(angle) * indicatorRadius;
  const dy = Math.sin(angle) * indicatorRadius;
  return {
    picker: {
      padding: pickerPadding,
      width: pickerSize,
      height: pickerSize,
    },
    pickerIndicator: {
      top: mx + dx - indicatorSize / 2,
      [isRTL ? "right" : "left"]: my + dy - indicatorSize / 2,
      width: indicatorSize,
      height: indicatorSize,
      borderRadius: indicatorSize / 2,
      backgroundColor: indicatorColor,
    },
    selectedPreview: {
      width: summarySize / 2,
      height: summarySize,
      top: pickerSize / 2 - summarySize / 2,
      left: Math.floor(pickerSize / 2),
      borderTopRightRadius: summarySize / 2,
      borderBottomRightRadius: summarySize / 2,
      backgroundColor: selectedColor,
    },
    originalPreview: {
      width: Math.ceil(summarySize / 2),
      height: summarySize,
      top: pickerSize / 2 - summarySize / 2,
      left: pickerSize / 2 - summarySize / 2,
      borderTopLeftRadius: summarySize / 2,
      borderBottomLeftRadius: summarySize / 2,
      backgroundColor: oldColor,
    },
    selectedFullPreview: {
      width: summarySize,
      height: summarySize,
      top: pickerSize / 2 - summarySize / 2,
      left: pickerSize / 2 - summarySize / 2,
      borderRadius: summarySize / 2,
      backgroundColor: selectedColor,
    },
  };
};

export const ColorPicker: FC<IHoloPickerProps> = (props) => {
  const [color, setColor] = useState<HsvColor>(() => {
    if (props.oldColor) {
      return tinycolor(props.oldColor).toHsv();
    }
    if (props.defaultColor) {
      return tinycolor(props.defaultColor).toHsv();
    }
    return { h: 0, s: 1, v: 1 };
  });

  const selectedColor = useMemo(() => {
    return props.state ? props.state.color : color;
  }, [color, props.state]);

  const setSelectedColor = useCallback(
    (color: HsvColor) => {
      props.state ? props.state.setColor(color) : setColor(color);
    },
    [props.state],
  );

  const [pickerSize, setPickerSize] = useState<number | null>(null);

  const _layout = useRef({ width: 0, height: 0, x: 0, y: 0 });
  const _pageX = useRef(0);
  const _pageY = useRef(0);
  const _isRTL = useRef(I18nManager.isRTL);
  const pickerContainerRef = useRef<View>(null);

  const getColor = useCallback(() => {
    const passedColor =
      typeof props.color === "string" ? tinycolor(props.color).toHsv() : props.color;
    return passedColor || selectedColor;
  }, [selectedColor, props.color]);

  const onColorChange = useCallback(
    (color: HsvColor) => {
      setSelectedColor(color);
      props.onColorChange && props.onColorChange(color);
    },
    [props, setSelectedColor],
  );

  const onSValueChange = useCallback(
    (s: number) => {
      const { h, v } = getColor();
      onColorChange({ h, s, v });
    },
    [getColor, onColorChange],
  );

  const onVValueChange = useCallback(
    (v: number) => {
      const { h, s } = getColor();
      onColorChange({ h, s, v });
    },
    [getColor, onColorChange],
  );

  const onLayout = useCallback(
    (l: {
      nativeEvent: {
        layout: { width: number; height: number; x: number; y: number };
      };
    }) => {
      _layout.current = l.nativeEvent.layout;

      const { width, height } = _layout.current;

      const size = Math.min(width, height);
      if (pickerSize !== size) {
        setPickerSize(size);
      }

      pickerContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        _pageX.current = pageX;
        _pageY.current = pageY;
      });
    },
    [pickerSize],
  );

  const computeHValue = useCallback(
    (x: number, y: number) => {
      const mx = (pickerSize || 0) / 2;
      const my = (pickerSize || 0) / 2;
      const dx = x - mx;
      const dy = y - my;
      const rad = Math.atan2(dx, dy) + Math.PI + Math.PI / 2;
      return ((rad * 180) / Math.PI) % 360;
    },
    [pickerSize],
  );

  const handleColorChange = useCallback(
    ({ x, y }: Point2D) => {
      const { s, v } = getColor();

      const marginLeft = (_layout.current.width - (pickerSize || 0)) / 2;
      const marginTop = (_layout.current.height - (pickerSize || 0)) / 2;
      const relativeX = x - _pageX.current - marginLeft;
      const relativeY = y - _pageY.current - marginTop;

      const h = computeHValue(relativeX, relativeY);
      onColorChange({ h, s, v });
      return true;
    },
    [getColor, pickerSize, computeHValue, onColorChange],
  );

  const pickerResponder = createPanResponder({
    onStart: handleColorChange,
    onMove: handleColorChange,
  });

  const hValueToRad = useCallback((deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return rad - Math.PI - Math.PI / 2;
  }, []);

  const SliderComp = useMemo(() => {
    if (props.sliderComponent) {
      return props.sliderComponent as any;
    }

    if (!Slider) {
      throw new Error(
        "You need to install `@react-native-community/slider` and pass it (or any other Slider compatible component) as `sliderComponent` prop",
      );
    }

    return Slider;
  }, [props.sliderComponent]);

  const computed = useMemo(() => {
    const color = getColor();
    const { h } = color;
    const angle = hValueToRad(h);
    const selectedColor = tinycolor(color).toHexString();
    const indicatorColor = tinycolor({ h, s: 1, v: 1 }).toHexString();

    return makeComputedStyles({
      pickerSize: pickerSize || 0,
      selectedColor,
      indicatorColor,
      oldColor: props.oldColor,
      angle,
      isRTL: _isRTL.current,
    });
  }, [getColor, hValueToRad, pickerSize, props.oldColor]);

  const onColorSelected = useCallback(() => {
    const { onColorSelected } = props;
    const color = tinycolor(getColor()).toHexString();
    onColorSelected && onColorSelected(color);
  }, [getColor, props]);

  const onOldColorSelected = useCallback(() => {
    const { oldColor, onOldColorSelected } = props;
    const color = tinycolor(oldColor);
    setSelectedColor(color.toHsv());
    onOldColorSelected && onOldColorSelected(color.toHexString());
  }, [props, setSelectedColor]);
  return (
    <>
      <View ref={pickerContainerRef} onLayout={onLayout} style={styles.pickerContainer}>
        <View style={styles.pickerContainerInner}>
          {pickerSize !== null && (
            <View>
              <View {...pickerResponder.panHandlers} style={[computed.picker]} collapsable={false}>
                <Image source={require("./color-circle.png")} style={[styles.pickerImage]} />
                <View style={[styles.pickerIndicator, computed.pickerIndicator]} />
              </View>
              {props.oldColor && (
                <TouchableOpacity
                  style={[styles.selectedPreview, computed.selectedPreview]}
                  onPress={onColorSelected}
                  activeOpacity={0.7}
                />
              )}
              {props.oldColor && (
                <TouchableOpacity
                  style={[styles.originalPreview, computed.originalPreview]}
                  onPress={onOldColorSelected}
                  activeOpacity={0.7}
                />
              )}
              {!props.oldColor && (
                <TouchableOpacity
                  style={[styles.selectedFullPreview, computed.selectedFullPreview]}
                  onPress={onColorSelected}
                  activeOpacity={0.7}
                />
              )}
            </View>
          )}
        </View>
      </View>
      {props.hideSliders ? null : (
        <View>
          <SliderComp
            value={selectedColor.s}
            onValueChange={onSValueChange}
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#ccc"
            maximumTrackTintColor="#000000"
          />
          <SliderComp
            value={selectedColor.v}
            onValueChange={onVValueChange}
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#ccc"
            maximumTrackTintColor="#000000"
          />
        </View>
      )}
    </>
  );
};
