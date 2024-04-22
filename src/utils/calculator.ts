/**
 * Converts pixel size to rem and accepts the base as second argument. default base is 16px
 *
 * @param {number|string} px
 * @param {number} base
 * @return {string}
 */
export const remCalc = (px: number | string, base = 16) => {
  let tempPx = px;

  if (typeof tempPx === "string") {
    tempPx = tempPx.replace("px", "");
  }

  tempPx = parseInt(tempPx.toString());

  return tempPx / base + "rem";
};
