import React from 'react';
import styled from 'styled-components';

const Item = (props) => {
  const { id, name, cost, value, isFirstItem } = props.item;
  const { numCookies, handleClick } = props;
  const { purchasedItems } = props;

  const btnRef = React.useRef(null);
  const setUseRef = () => {
    if (btnRef && isFirstItem === true) {
      btnRef.current.focus();
      return;
    }
  }

  React.useEffect(() => {
    setUseRef();
  }, []);

  return (
      <Button onClick={() => {handleClick(id, cost)}} ref={btnRef}>
        <Wrapper>
        <LeftCol>       
          <Name>{name}</Name>
      <Text>
        Cost: {cost} cookie(s). Produces {value} cookies/second.
      </Text>
      </LeftCol>
      <RightCol>
        <Number>
          {purchasedItems[id]}
        </Number>
      </RightCol>
      </Wrapper>
      </Button>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid gray;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`; 

const LeftCol = styled.div``;

const RightCol = styled.div``;

const Name = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Text = styled.p`
  font-size: 1rem;
`;

const Number = styled.p`
  font-size: 2rem;
`;

const Button = styled.button`
  background-color: #222;
  border: none;
  color: white;
  cursor: pointer;
  text-align: left;
`;

export default Item;