import { Meta, StoryObj } from "@storybook/react/*";
import { type ComponentProps } from "react";

import { Button } from "./Button";
import { Box } from "../Box";
import { Flex } from "../Flex";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    colorScheme: {
      control: "select",
      options: [
        "primary",
        "br_4",
        "yellow_3",
        "gray_1",
        "gray_2",
        "gray_3",
        "gray_4",
        "gray_5",
        "white",
        "red_1",
        "red_2"
      ],
      description: "버튼의 색상 스키마를 선택합니다."
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "버튼의 크기를 선택합니다."
    },
    variant: {
      control: "select",
      options: ["rectangle", "pill", 16],
      description: "버튼의 모양(모서리의 형태)을 설정합니다."
    },
    disabled: {
      control: "boolean",
      description: "버튼을 비활성화 상태로 설정합니다."
    },
    width: {
      control: "select",
      options: ["full", "auto", 112, 167, 248, 330, 358],
      description: "버튼의 너비를 설정합니다."
    },
    gap: {
      control: "number",
      description: "버튼 내 요소 간의 간격을 설정합니다."
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
type Args = ComponentProps<typeof Button>;

export const Basic: Story = {
  render: (props: Args) => <Button {...props} />,
  args: {
    children: "Button",
    colorScheme: "primary",
    size: "lg",
    width: "full",
    variant: "rectangle"
  }
};
export const Variant: Story = {
  render: (props: Args) => (
    <Flex gap={10} align="center">
      <Button {...props} variant="rectangle" colorScheme="br_4" size="sm" typo="label2_14_M">
        Rectangle button
      </Button>
      <Button {...props} variant="pill" colorScheme="yellow_3" size="xs" typo="caption1_12_B">
        Pill button
      </Button>
      <Button {...props} variant={12} colorScheme="red_2" size="md" typo="label2_14_B">
        Custom button
      </Button>
    </Flex>
  )
};

export const Sizes = (props: Args) => (
  <Flex gap={10} align="center">
    <Button {...props} size="xs" colorScheme="br_4">
      xs button
    </Button>
    <Button {...props} size="sm" colorScheme="br_4">
      sm button
    </Button>
    <Button {...props} size="md" colorScheme="br_4">
      md button
    </Button>
    <Button {...props} size="lg" colorScheme="br_4">
      lg button
    </Button>
  </Flex>
);

export const ColorSchemes = (props: Args) => (
  <Flex gap={10}>
    <Button {...props} colorScheme="primary">
      primary
    </Button>
    <Button {...props} colorScheme="br_4">
      br_4
    </Button>
    <Button {...props} colorScheme="yellow_3">
      yellow_3
    </Button>
    <Button {...props} colorScheme="gray_1">
      gray_1
    </Button>
    <Button {...props} colorScheme="gray_2">
      gray_2
    </Button>
    <Button {...props} colorScheme="gray_3">
      gray_3
    </Button>
    <Button {...props} colorScheme="gray_4">
      gray_4
    </Button>
    <Button {...props} colorScheme="gray_5">
      gray_5
    </Button>
    <Button {...props} colorScheme="white">
      white
    </Button>
    <Button {...props} colorScheme="red_1">
      red_1
    </Button>
    <Button {...props} colorScheme="red_2">
      red_2
    </Button>
  </Flex>
);

export const Disabled = (props: Args) => (
  <>
    <Button {...props} disabled>
      disabled
    </Button>
  </>
);

export const Width = (props: Args) => (
  <Box position="absolute" left={0} right={0} textAlign="center">
    <Button {...props} width="full">
      full
    </Button>
    <Button {...props}>auto</Button>
  </Box>
);

export const WithAddon = (props: Args) => (
  <Flex gap={10}>
    <Button
      {...props}
      leftAddon={<div>🐶</div>}
      variant="rectangle"
      colorScheme="br_4"
      size="sm"
      typo="label2_14_M"
    >
      Left Icon
    </Button>
    <Button
      {...props}
      rightAddon={<div>🐶</div>}
      variant="rectangle"
      colorScheme="br_4"
      size="sm"
      typo="label2_14_M"
    >
      Right Icon
    </Button>
    <Button
      {...props}
      leftAddon={<div>🐶</div>}
      rightAddon={<div>😾</div>}
      variant="rectangle"
      colorScheme="br_4"
      size="sm"
      typo="label2_14_M"
      gap={8}
    >
      Left Icon and Right Icon
    </Button>
  </Flex>
);
