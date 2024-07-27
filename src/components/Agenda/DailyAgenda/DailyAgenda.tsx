import { Text } from "components/common";

import { AgendaData } from "./AgendaData";
import { EmptyAgenda } from "./EmptyAgenda";
import { AgendaContainer } from "./styles";

export const DailyAgenda = () => {
  return (
    <AgendaContainer>
      <Text as="p" typo="label1_16_B" color="primaryColor" textAlign="center">
        2023 . 11 . 13
      </Text>
      <AgendaData />
      {/* <EmptyAgenda /> */}
    </AgendaContainer>
  );
};
