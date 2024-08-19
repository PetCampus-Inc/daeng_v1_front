import { Tabs } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Tabs",
  component: Tabs.Root,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "divider", "toggle"],
      description: "Tabs의 스타일링 타입"
    },
    value: { control: "text", description: "제어 컴포넌트로 사용 시 선택된 탭" },
    defaultValue: {
      control: "text",
      description: "비제어 컴포넌트로 사용 시 기본적으로 선택된 탭"
    },
    onValueChange: { action: "changed", description: "새로운 탭이 선택될 때 호출되는 함수" },
    activationMode: {
      control: "radio",
      options: ["automatic", "manual"],
      description: "탭이 자동으로 활성화될지 또는 수동으로 활성화될지 여부"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Underline: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs.Root>
  ),
  args: {
    defaultValue: "tab1",
    variant: "underline"
  }
};

export const Toggle: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs.Root>
  ),
  args: {
    defaultValue: "tab1",
    variant: "toggle"
  }
};

export const Divider: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs.Root>
  ),
  args: {
    defaultValue: "tab1",
    variant: "divider"
  }
};
