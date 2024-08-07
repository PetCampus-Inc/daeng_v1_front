import { type MutableRefObject, type Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = value;
  }
}

export function composeRefs<T>(...refs: Ref<T>[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      setRef(ref, node);
    });
  };
}
