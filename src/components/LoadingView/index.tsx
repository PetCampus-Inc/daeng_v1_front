import { StyledWrapper, StyledTitle } from "./styles";
import React from "react";

type LoadingIndicatorProps = {
    isLoading: boolean;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
    return (
        <StyledWrapper>
            {isLoading ? (
                <StyledTitle>Page Loading...</StyledTitle>
            ) : <StyledTitle>Loading Completed!</StyledTitle>
            }
        </StyledWrapper>
    );
}

export default LoadingIndicator;