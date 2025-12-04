import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Color, Vector3 } from 'three';
import { REFRESH_RATE } from '@/constants/config-fluid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hexToRgb = (hex: string) => {
    const color = new Color(hex);

    return new Vector3(color.r, color.g, color.b);
};

export const normalizeScreenHz = (value: number, dt: number) => {
    return Math.pow(value, dt * REFRESH_RATE);
};