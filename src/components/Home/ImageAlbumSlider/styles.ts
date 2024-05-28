import styled, { css } from "styled-components";

export const SlideWrapper = styled.div`
  position: relative;
  display: inline-block;

  width: 107px;
  height: 127px;

  border-radius: 12px;
  overflow: hidden;

  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Dimmer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  background: linear-gradient(1deg, rgba(0, 0, 0, 0.6) 0.67%, rgba(0, 0, 0, 0) 97.81%), #d3d3d300;

  background-size: cover;
  background-repeat: no-repeat;

  box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.04);
`;

const BadgeStyle = css`
  position: absolute;

  color: ${({ theme }) => theme.colors.white};
  background-color: rgba(41, 41, 41, 0.5);
  border-radius: 90px;

  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const CountBadge = styled.span`
  ${BadgeStyle};
  max-width: 23px;
  padding: 2px 4px;

  right: 8px;
  top: 8px;
`;

export const TransmissionTime = styled.span`
  ${BadgeStyle};
  padding: 2px 8px;

  right: 8px;
  bottom: 10px;
`;

export const MoreButtonStyle = css`
  background-color: transparent;
  border: none;
  outline: none;

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_1};

  gap: 0;
`;
