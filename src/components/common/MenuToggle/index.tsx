import { AnimatePresence, motion } from "framer-motion";

import * as S from "./styles";

interface MenuToggleProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
const MenuToggle = ({ selectedTab, setSelectedTab }: MenuToggleProps) => {
  const initialTabs = ["알림장", "사진앨범"];
  return (
    <AnimatePresence>
      <S.Container>
        {initialTabs.map((tab) => (
          <S.Tab key={tab} onClick={() => setSelectedTab(tab)}>
            <motion.div key={tab}>
              <S.MotionTab
                layoutId={selectedTab === tab ? "filled-tab" : undefined}
                selected={selectedTab === tab}
              >
                {tab}
              </S.MotionTab>
            </motion.div>
          </S.Tab>
        ))}
      </S.Container>
    </AnimatePresence>
  );
};

export default MenuToggle;
