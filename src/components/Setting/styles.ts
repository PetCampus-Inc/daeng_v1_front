import styled from "styled-components";

interface ISettingProps {
  type?: string;
}

export const SettingList = styled.ul``;

export const SettingItem = styled.li<ISettingProps>`
  padding: 16px;
  display: flex;
  flex-direction: ${(props) => (props.type === "verUpdate" ? "column" : "row")};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  ${({ theme }) => theme.typo.label1_16_M};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const TopBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtomBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.span`
  ${({ theme }) => theme.typo.label1_16_M};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const GotoPageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
`;

export const GotoUpdateButton = styled.button`
  ${({ theme }) => theme.typo.caption1_12_B};
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  font-weight: 700;
  padding: 0 0.5rem;
`;
