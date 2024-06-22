import { Meta, StoryObj } from "@storybook/react/*";
import { Flex } from "components/common/Flex";
import { type ComponentProps } from "react";

import { SmallButton } from "./SmallButton";

const meta = {
  title: "Components/Button/Small Button",
  component: SmallButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    colorScheme: {
      control: "select",
      options: ["br_4", "gray_4"]
    },
    disabled: {
      control: "boolean",
      description: "버튼을 비활성화 상태로 설정합니다."
    },
    gap: {
      control: "number"
    },
    bg: {
      description: "버튼의 배경 색상을 설정합니다."
    },
    color: {
      description: "버튼의 글자 색상을 설정합니다."
    },
    typo: {
      control: "select",
      options: ["body1_16_R", "body2_16_B", "caption_12_R"],
      description: "버튼의 타이포그래피를 설정합니다."
    },
    css: {
      description: "버튼에 적용할 추가 CSS 스타일을 설정합니다."
    }
  }
} satisfies Meta<typeof SmallButton>;

export default meta;
type Story = StoryObj<typeof meta>;
type Args = ComponentProps<typeof SmallButton>;

export const Basic: Story = {
  args: {
    colorScheme: "br_4",
    children: "강아지 추가하기",
    gap: 8
  },
  render: (props: Args) => (
    <Flex gap={10} align="center">
      <SmallButton {...props} leftAddon={<span>🐶</span>} />
      <SmallButton {...props} colorScheme="gray_4">
        전체 해제
      </SmallButton>
    </Flex>
  )
};
