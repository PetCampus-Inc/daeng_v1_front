import { Meta, StoryObj } from "@storybook/react/*";
import { Flex } from "components/common/Flex";
import { type ComponentProps } from "react";

import { MoreButton } from "./MoreButton";

const meta = {
  title: "Components/Button/More Button",
  component: MoreButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: "number"
    },
    typo: {
      control: "select",
      options: ["body1_16_R", "label2_14_M", "label2_14_R"]
    }
  }
} satisfies Meta<typeof MoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;
type Args = ComponentProps<typeof MoreButton>;

export const Basic: Story = {
  args: {
    children: ""
  },
  render: (props: Args) => (
    <Flex direction="column" gap={10} align="center">
      <MoreButton {...props} iconColorScheme="gray_3" gap={4}>
        유치원 정보 수정
      </MoreButton>
      <MoreButton {...props} typo="body2_16_R">
        전체보기
      </MoreButton>
      <MoreButton {...props} color="gray_2" iconSize={24}>
        유치원 정보 수정
      </MoreButton>
    </Flex>
  )
};
