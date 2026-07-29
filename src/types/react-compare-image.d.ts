declare module "react-compare-image" {
  import { ComponentType, ReactNode } from "react";

  interface ReactCompareImageProps {
    leftImage: string;
    rightImage: string;
    leftImageAlt?: string;
    rightImageAlt?: string;
    sliderPositionPercentage?: number;
    sliderLineColor?: string;
    handle?: ReactNode;
    skeleton?: ReactNode;
    onSliderPositionChange?: (position: number) => void;
    aspectRatio?: string;
    horizontal?: boolean;
  }

  const ReactCompareImage: ComponentType<ReactCompareImageProps>;
  export default ReactCompareImage;
}
