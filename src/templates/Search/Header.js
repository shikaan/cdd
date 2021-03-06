import React, {useCallback, useEffect} from "react";
import styled from "styled-components";

import {Size} from "~theme";

import Link from "~components/Button";
import Icon from "~components/Icon";

const headerHeight = new Size(7);

const StyledHeader = styled.header`
  height: ${headerHeight};
  text-align: right;
`;

const CloseButton = styled(Link)(({theme}) => `
  color: ${theme.color.dark500};
  font-size: ${theme.typography.baseFontSize.multiply(1.125)};
  line-height: ${headerHeight};
  padding: 0 ${theme.templateVariables.horizontalPadding} 0 0;
  cursor: pointer;
  background: unset;
  
  &:hover {
    background: unset;
  }
`);

const useKey = (key, callback) => {
  const wrappedCallback = useCallback(function (e) {
    if (e.key === key) {
      callback(e);
    }
  }, [callback, key]);

  useEffect(() => {
    document.addEventListener("keydown", wrappedCallback);

    return () => {
      document.removeEventListener("keydown", wrappedCallback);
    };
  }, [wrappedCallback]);
};

const Header = () => {
  useKey("Escape", () => window.history.back());

  return (
    <StyledHeader>
      <CloseButton onClick={() => window.history.back()}>
        <Icon>
          close
        </Icon>
      </CloseButton>
    </StyledHeader>
  );
};

export default Header;
