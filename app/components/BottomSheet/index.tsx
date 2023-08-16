/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode, RefObject, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {
  children: ReactNode;
  index: number;
  snapPoints?: string[];
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  onChange?: (index: number) => void;
};

export const BottomSheet: FC<Props> = ({
  children,
  bottomSheetModalRef,
  snapPoints,
  ...props
}: Props) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  );

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  return (
    <>
      {snapPoints ? (
        <BottomSheetModal
          {...props}
          snapPoints={snapPoints}
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
        >
          {children}
        </BottomSheetModal>
      ) : (
        <BottomSheetModal
          {...props}
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          snapPoints={animatedSnapPoints as any}
          contentHeight={animatedContentHeight}
          handleHeight={animatedHandleHeight}
          key={`Modal${animatedContentHeight}`}
        >
          <BottomSheetView style={{ flex: 1 }} onLayout={handleContentLayout}>
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      )}
    </>
  );
};
