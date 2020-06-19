import styled from 'styled-components';
import {
  subtleBoxShadow,
  lightBlueBackground,
  greenBoxShadow,
  redBoxShadow
} from './Styles';

export const Tile = styled.div`
  padding: 0.85rem;
  ${subtleBoxShadow};
  ${lightBlueBackground};
`;

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
`;
