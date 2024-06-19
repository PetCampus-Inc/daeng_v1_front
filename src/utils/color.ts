export function hexToRGBA(hexCode: string, opacity = 1) {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
}

/**
 * HEX 색상 코드를 HSL 색상 코드로 변환하고, 지정된 밝기 변화량을 적용합니다.
 *
 * @param {string} hex - 변환할 HEX 색상 코드입니다. 예: "#RRGGBB".
 * @param {number} [lightness] - 밝기를 조절할 변화량입니다. 값은 -100에서 100 사이여야 하며,
 *                                   양수는 밝기를 증가시키고, 음수는 밝기를 감소시킵니다.
 * @returns {string} "hsl(h, s%, l%)" 형식의 HSL 색상 코드를 반환합니다.
 *                   여기서 h는 색상 degree(0에서 360도), s는 채도 퍼센트(0%에서 100%),
 *                   l은 조정된 밝기 퍼센트(0%에서 100%)입니다.
 */
export function hexToHSL(hex: string, lightness?: number): string {
  // HEX를 RGB로 변환
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // RGB 값을 0에서 1 사이로 정규화
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  // 색조(hue), 채도(saturation), 밝기(lightness) 계산
  if (max === min) {
    h = s = 0; // 무채색
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // 원래 밝기에서 지정된 변화량만큼 밝기 조정
  if (lightness) {
    l = Math.min(1, Math.max(0, l + lightness / 100));
  }

  // HSL을 도(degree), 퍼센트로 변환
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}
