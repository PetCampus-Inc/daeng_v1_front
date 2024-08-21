import { AnimatePresence, motion } from "framer-motion";

import * as S from "./styles";

interface MenuToggleProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
// FIXME: 모션 수정
const MenuToggle = ({ selectedTab, setSelectedTab }: MenuToggleProps) => {
  const initialTabs = ["알림장", "사진앨범"];
  return (
    <AnimatePresence>
      <S.Container>
        {initialTabs.map((tab) => (
          <S.Tab key={tab} onClick={() => setSelectedTab(tab)}>
            <motion.div
              key={tab}
              initial={{ x: selectedTab === tab ? 0 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: selectedTab === tab ? -100 : 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <S.MotionTab
                layoutId="filled-tab"
                initial={{ x: selectedTab === tab ? 0 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: selectedTab === tab ? -100 : 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
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
