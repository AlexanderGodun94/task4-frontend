import styled from 'styled-components';

interface ContainerProps {
  marginY?: number,
  marginX?: number,
  marginTop?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number,
  relative?: boolean
}
export const Container = styled.div`${(p: ContainerProps) => `
  ${(p.marginTop || p.marginY ? `margin-top: ${p.marginTop || p.marginY}px` : '')};
  ${(p.marginBottom || p.marginY ? `margin-bottom: ${p.marginBottom || p.marginY}px` : '')};
  ${(p.marginLeft || p.marginX ? `margin-left: ${p.marginLeft || p.marginX}px` : '')};
  ${(p.marginRight || p.marginX ? `margin-right: ${p.marginRight || p.marginX}px` : '')};
  ${p.relative ? `position: relative;` : ''}
`}`;
