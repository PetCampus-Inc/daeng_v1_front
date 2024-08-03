import { StoryObj, Meta } from "@storybook/react";
import { ComponentProps } from "react";

import { Box } from ".";

const meta = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    // Layout Props
    display: {
      control: "select",
      options: ["block", "inline", "flex", "grid", "none"],
      description: "요소의 display 속성을 설정합니다.",
      table: {
        category: "Layout",
        type: { summary: "CSSProperties['display']" }
      }
    },
    width: {
      control: "text",
      description: "요소의 너비를 설정합니다. 숫자(px), 문자열, 또는 키워드를 사용할 수 있습니다.",
      table: {
        category: "Layout",
        type: { summary: "'full' | 'fit' | 'min' | 'max' | 'auto' | number | string" }
      }
    },
    maxWidth: {
      control: "text",
      description: "요소의 최대 너비를 설정합니다.",
      table: {
        category: "Layout",
        type: { summary: "'full' | 'fit' | 'min' | 'max' | 'auto' | number | string" }
      }
    },
    minWidth: {
      control: "text",
      description: "요소의 최소 너비를 설정합니다.",
      table: {
        category: "Layout",
        type: { summary: "'full' | 'fit' | 'min' | 'max' | 'auto' | number | string" }
      }
    },
    height: {
      control: "text",
      description: "요소의 높이를 설정합니다. 숫자(px), 문자열, 또는 키워드를 사용할 수 있습니다.",
      table: {
        category: "Layout",
        type: { summary: "'full' | 'fit' | 'min' | 'max' | 'auto' | number | string" }
      }
    },
    // Spacing Props
    m: {
      control: "text",
      description: "모든 방향의 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    margin: {
      control: "text",
      description: "모든 방향의 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    mt: {
      control: "text",
      description: "상단 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    marginTop: {
      control: "text",
      description: "상단 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    mr: {
      control: "text",
      description: "우측 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    marginRight: {
      control: "text",
      description: "우측 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    mb: {
      control: "text",
      description: "하단 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    marginBottom: {
      control: "text",
      description: "하단 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    ml: {
      control: "text",
      description: "좌측 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    marginLeft: {
      control: "text",
      description: "좌측 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    mx: {
      description: "좌우 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    marginX: {
      control: "text",
      description: "좌우 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    my: {
      control: "text",
      description: "상하 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    marginY: {
      control: "text",
      description: "상하 margin을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    p: {
      control: "text",
      description: "모든 방향의 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    padding: {
      control: "text",
      description: "모든 방향의 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    pt: {
      control: "text",
      description: "상단 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    paddingTop: {
      control: "text",
      description: "상단 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    pr: {
      control: "text",
      description: "우측 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    paddingRight: {
      control: "text",
      description: "우측 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    pb: {
      control: "text",
      description: "하단 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    paddingBottom: {
      control: "text",
      description: "하단 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    pl: {
      control: "text",
      description: "좌측 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    paddingLeft: {
      control: "text",
      description: "좌측 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    px: {
      control: "text",
      description: "좌우 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    paddingX: {
      control: "text",
      description: "좌우 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    py: {
      control: "text",
      description: "상하 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    paddingY: {
      control: "text",
      description: "상하 padding을 설정합니다.",
      table: {
        category: "Spacing",
        type: { summary: "number | string" }
      }
    },
    // Color Props
    bg: {
      control: "text",
      description: "배경색을 설정합니다.",
      table: {
        category: "Color",
        type: { summary: "ColorKeys" }
      }
    },
    backgroundColor: {
      control: "text",
      description: "배경색을 설정합니다.",
      table: {
        category: "Color",
        type: { summary: "ColorKeys" }
      }
    },
    color: {
      control: "text",
      description: "텍스트 색상을 설정합니다.",
      table: {
        category: "Color",
        type: { summary: "ColorKeys" }
      }
    },
    // Border Props
    border: {
      control: "number",
      description: "테두리 두께를 설정합니다.",
      table: {
        category: "Border",
        type: { summary: "number" }
      }
    },
    borderColor: {
      control: "text",
      description: "테두리 색상을 설정합니다.",
      table: {
        category: "Border",
        type: { summary: "ColorKeys" }
      }
    },
    borderTop: {
      control: "number",
      description: "상단 테두리 두께를 설정합니다.",
      table: {
        category: "Border",
        type: { summary: "number" }
      }
    },
    borderRight: {
      control: "number",
      description: "우측 테두리 두께를 설정합니다.",
      table: {
        category: "Border",
        type: { summary: "number" }
      }
    },
    borderBottom: {
      control: "number",
      description: "하단 테두리 두께를 설정합니다.",
      table: {
        category: "Border",
        type: { summary: "number" }
      }
    },
    borderRadius: {
      control: "text",
      description:
        "테두리 둥글기를 설정합니다. 숫자(px) 또는 'rectangle', 'circle' 키워드를 사용할 수 있습니다.",
      table: {
        category: "Border",
        type: { summary: "number | 'rectangle' | 'circle'" }
      }
    },
    radius: {
      control: "text",
      description: "테두리 둥글기를 설정합니다. borderRadius와 동일한 기능입니다.",
      table: {
        category: "Border",
        type: { summary: "number | 'rectangle' | 'circle'" }
      }
    },
    // Position Props
    position: {
      control: "select",
      options: ["static", "relative", "absolute", "fixed", "sticky"],
      description: "요소의 position 속성을 설정합니다.",
      table: {
        category: "Position",
        type: { summary: "CSSProperties['position']" }
      }
    },
    top: {
      control: "text",
      description: "요소의 상단 위치를 설정합니다.",
      table: {
        category: "Position",
        type: { summary: "CSSProperties['top']" }
      }
    },
    right: {
      control: "text",
      description: "요소의 우측 위치를 설정합니다.",
      table: {
        category: "Position",
        type: { summary: "CSSProperties['right']" }
      }
    },
    bottom: {
      control: "text",
      description: "요소의 하단 위치를 설정합니다.",
      table: {
        category: "Position",
        type: { summary: "CSSProperties['bottom']" }
      }
    },
    left: {
      control: "text",
      description: "요소의 좌측 위치를 설정합니다.",
      table: {
        category: "Position",
        type: { summary: "CSSProperties['left']" }
      }
    },
    zIndex: {
      control: "number",
      description: "요소의 z-index를 설정합니다.",
      table: {
        category: "Position",
        type: { summary: "CSSProperties['zIndex']" }
      }
    },
    // Flexbox Props
    flex: {
      control: "text",
      description: "flex 속성을 설정합니다.",
      table: {
        category: "Flexbox",
        type: { summary: "number" }
      }
    },
    direction: {
      control: "select",
      options: ["row", "column"],
      description: "flex-direction 속성을 설정합니다.",
      table: {
        category: "Flexbox",
        type: { summary: "'row' | 'column'" }
      }
    },
    justify: {
      control: "select",
      options: ["center", "flex-start", "flex-end", "space-between", "space-around"],
      description: "justify-content 속성을 설정합니다.",
      table: {
        category: "Flexbox",
        type: { summary: "'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'" }
      }
    },
    align: {
      control: "select",
      options: ["center", "flex-start", "flex-end", "stretch"],
      description: "align-items 속성을 설정합니다.",
      table: {
        category: "Flexbox",
        type: { summary: "'center' | 'flex-start' | 'flex-end' | 'stretch'" }
      }
    },
    gap: {
      control: "number",
      description: "flex 아이템 간의 간격을 설정합니다.",
      table: {
        category: "Flexbox",
        type: { summary: "number" }
      }
    },
    // Other Props
    overflow: {
      control: "select",
      options: ["visible", "hidden", "scroll", "auto"],
      description: "overflow 속성을 설정합니다.",
      table: {
        category: "Other",
        type: { summary: "CSSProperties['overflow']" }
      }
    },
    textAlign: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "text-align 속성을 설정합니다.",
      table: {
        category: "Other",
        type: { summary: "'left' | 'center' | 'right' | 'justify'" }
      }
    }
  }
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;
type Args = ComponentProps<typeof Box>;

export const Default: Story = {
  args: {
    children: "Box 입니다",
    m: 10,
    px: 16,
    py: 20,
    width: "auto",
    border: 2,
    borderColor: "gray_1",
    radius: "rectangle"
  }
};

export const WithCustomSpacing: Story = {
  args: {
    children: "사용자 정의 간격을 가진 Box",
    mx: "10%",
    py: "2rem",
    bg: "br_2"
  },
  parameters: {
    docs: {
      description: {
        story: "간격에 %와 rem 단위를 사용하는 방법 예시입니다."
      }
    }
  }
};

export const FlexboxExample: Story = {
  render: (props: Args) => (
    <>
      <Box bg="primary_4" p={2} color="white">
        왼쪽
      </Box>
      <Box bg="primary_2" p={2} color="white">
        오른쪽
      </Box>
    </>
  ),
  args: {
    display: "flex",
    justify: "space-between",
    align: "center",
    p: 4,
    height: "100px"
  },
  parameters: {
    docs: {
      description: {
        story: "Flexbox를 사용한 레이아웃 예시입니다."
      }
    }
  }
};

export const NestedBoxes: Story = {
  render: (props: Args) => (
    <>
      <Box p={16} bg="secondColor" color="white">
        상단 박스
      </Box>
      <Box display="flex" justify="space-between">
        <Box p={16} width="20%" bg="thirdColor" color="white">
          왼쪽 하단
        </Box>
        <Box p={16} width="50%" bg="fourthColor" color="white">
          오른쪽 하단
        </Box>
      </Box>
    </>
  ),
  args: {
    p: 16,
    bg: "gray_3"
  },
  parameters: {
    docs: {
      description: {
        story: "Box 컴포넌트를 중첩하여 사용하는 예시입니다."
      }
    }
  }
};
