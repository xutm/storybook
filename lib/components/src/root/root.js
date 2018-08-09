import React, { Component, Children } from 'react';
import styled from 'react-emotion';

const Container = styled('div')({
  background: 'hotpink',
});

const Pane1 = ({ active }) => <div>PANE 1 {active}</div>;
const Pane2 = ({ active }) => <div>PANE 2 {active}</div>;
const Pane3 = ({ active }) => <div>PANE 3 {active}</div>;

const Pane = ({ active, children }) => (
  <div>
    {children} ! {active}
  </div>
);

const Panels = ({ children, active }) =>
  Children.toArray(children).map((item, index) => (
    <Pane active={active === index}>
      {item} ({active}={index})
    </Pane>
  ));
const Bar = ({ children }) => children;

class Root extends Component {
  state = {
    active: 2,
  };

  render() {
    const { active } = this.state;
    return (
      <Container>
        {active}
        <Panels active={active}>
          <Pane1 />
          <Pane2 />
          <Pane3 />
        </Panels>
        <Bar active={active}>
          <button onClick={() => this.setState({ active: 1 })}>pane 1</button>
          <button onClick={() => this.setState({ active: 2 })}>pane 2</button>
          <button onClick={() => this.setState({ active: 3 })}>pane 3</button>
        </Bar>
      </Container>
    );
  }
}

export { Root as default };
