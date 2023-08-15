import { LoadingIndicator } from "components/index";
import { useEffect } from "react";
import useLoadingStatus from "hooks/useLoadingStatus";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    const { loadingStatus, setLoadingStatus } = useLoadingStatus();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingStatus("Loading Completed!")
        }, 2000);
        return () => clearTimeout(timer);
    });

    const handleButtonClick = () => {
        setLoadingStatus("Navigating to login page...")
        const timer = setTimeout(() => {
            navigate("/login");
        }, 1000);
        return () => clearTimeout(timer);
    };

    return (
        <div>
            <LoadingIndicator message={loadingStatus} />
            {
                loadingStatus === "Loading Completed!" &&
                <StyledButton onClick={handleButtonClick}>
                    Go to Login Page
                </StyledButton>
            }
        </div>
    );
};


const StyledButton = styled.button`
  background-color: #6A24FE;
  color: #fff;
  margin: 0 30px ;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4b19cc;
  }
`;

export default IndexPage;
