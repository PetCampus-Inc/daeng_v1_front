import { Meta, StoryObj } from "@storybook/react/*";
import { Flex } from "components/common/Flex";
import { type ComponentProps } from "react";

import { XSmallButton } from "./XSmallButton";

const meta = {
  title: "Components/Button/XSmall Button",
  component: XSmallButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    colorScheme: {
      control: "select",
      options: ["yellow_3", "gray_4", "gray_5", "white"]
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
} satisfies Meta<typeof XSmallButton>;

export default meta;
type Story = StoryObj<typeof meta>;
type Args = ComponentProps<typeof XSmallButton>;

export const Basic: Story = {
  args: {
    colorScheme: "yellow_3",
    typo: "caption1_12_B",
    children: "파일 열기"
  },
  render: (props: Args) => (
    <Flex gap={10} align="center">
      <XSmallButton {...props} />
      <XSmallButton {...props} colorScheme="gray_4" typo="caption1_12_R" />
      <XSmallButton {...props} gap={8} leftAddon={<span>🐶</span>}>
        알림 전송
      </XSmallButton>
    </Flex>
  )
};
