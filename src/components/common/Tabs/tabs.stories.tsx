import React from "react";

import { TabsPrimitive } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TabsPrimitive.Root> = {
  title: "Components/TabsPrimitive",
  component: TabsPrimitive.Root,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    defaultValue: { control: "text" },
    onValueChange: { action: "changed" },
    activationMode: {
      control: "radio",
      options: ["automatic", "manual"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof TabsPrimitive.Root>;

export const Basic: Story = {
  render: (args) => (
    <TabsPrimitive.Root {...args}>
      <TabsPrimitive.List>
        <TabsPrimitive.Trigger value="tab1">Tab 1</TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab2">Tab 2</TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab3">Tab 3</TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content value="tab1">Content 1</TabsPrimitive.Content>
      <TabsPrimitive.Content value="tab2">Content 2</TabsPrimitive.Content>
      <TabsPrimitive.Content value="tab3">Content 3</TabsPrimitive.Content>
    </TabsPrimitive.Root>
  ),
  args: {
    defaultValue: "tab1"
  }
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <TabsPrimitive.Root value={value} onValueChange={setValue}>
        <TabsPrimitive.List>
          <TabsPrimitive.Trigger value="tab1">Tab 1</TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger value="tab2">Tab 2</TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger value="tab3">Tab 3</TabsPrimitive.Trigger>
        </TabsPrimitive.List>
        <TabsPrimitive.Content value="tab1">Content 1</TabsPrimitive.Content>
        <TabsPrimitive.Content value="tab2">Content 2</TabsPrimitive.Content>
        <TabsPrimitive.Content value="tab3">Content 3</TabsPrimitive.Content>
      </TabsPrimitive.Root>
    );
  }
};

export const ManualActivation: Story = {
  render: (args) => (
    <TabsPrimitive.Root {...args}>
      <TabsPrimitive.List>
        <TabsPrimitive.Trigger value="tab1">Tab 1</TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab2">Tab 2</TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger value="tab3">Tab 3</TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content value="tab1">Content 1</TabsPrimitive.Content>
      <TabsPrimitive.Content value="tab2">Content 2</TabsPrimitive.Content>
      <TabsPrimitive.Content value="tab3">Content 3</TabsPrimitive.Content>
    </TabsPrimitive.Root>
  ),
  args: {
    defaultValue: "tab1",
    activationMode: "manual"
  }
};
