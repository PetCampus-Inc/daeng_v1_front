import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { dropdownAtom } from "store/dropDown";

const useDropdown = (id: number) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [openDropdownId, setOpenDropdownId] = useRecoilState(dropdownAtom);
  const isOpen = openDropdownId === id;

  const toggle = () => {
    if (isOpen) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenDropdownId, ref]);

  return { isOpen, toggle, ref };
};

export default useDropdown;
