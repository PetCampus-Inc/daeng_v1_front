import { Meta, StoryObj } from "@storybook/react/*";
import { Box } from "components/common/Box";
import { Flex } from "components/common/Flex";
import { type ComponentProps } from "react";

import { WideButton } from "./WideButton";

const meta = {
  title: "Components/Button/Wide Button",
  component: WideButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    colorScheme: {
      control: "select",
      options: ["primary", "br_4", "gray_1", "gray_2", "gray_3", "gray_4", "gray_5"]
    },
    disabled: {
      control: "boolean"
    },
    gap: {
      control: "number"
    },
    bg: {},
    color: {
      description: "버튼의 글자 색상을 설정합니다."
    },
    typo: {
      control: "select",
      options: ["body1_16_R", "body2_16_B", "caption_12_R"]
    },
    css: {
      description: "버튼에 적용할 추가 CSS 스타일을 설정합니다."
    }
  }
} satisfies Meta<typeof WideButton>;

export default meta;
type Story = StoryObj<typeof meta>;
type Args = ComponentProps<typeof WideButton>;

export const Basic: Story = {
  args: {
    children: ""
  },
  render: (props: Args) => (
    <Box display="flex" direction="column" gap={10} align="center" minWidth="500px">
      <Flex gap={4} width="full">
        <WideButton colorScheme="br_4" css={{ flex: 1 }} {...props}>
          이전
        </WideButton>
        <WideButton css={{ flex: 3 }} {...props}>
          다음
        </WideButton>
      </Flex>
      <WideButton colorScheme="gray_4" typo="body2_16_R" {...props}>
        전송하기
      </WideButton>
    </Box>
  )
};
