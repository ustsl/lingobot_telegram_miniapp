import { baseSizes } from "@/types/baseTypes";
import { ReactNode } from "react";

export interface IIconMenuBase {
  text: string;
  icon?: ReactNode;
  size?: baseSizes;
  fontSize?: baseSizes;
}

export interface IIconMenuPoint extends IIconMenuBase {
  link: string;
}

export interface IIconMenuButtonPoint extends IIconMenuBase {
  onClick: () => void;
}
