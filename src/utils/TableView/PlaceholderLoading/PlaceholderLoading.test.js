import React from 'react';
import PlaceholderLoading from './PlaceholderLoading.jsx';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';

describe('PlaceholderLoading component', () => {
  afterEach(cleanup);

  it('renders w/o props', () => {
    render(<PlaceholderLoading />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<PlaceholderLoading />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders 20 items', () => {
    const { container } = render(
      <PlaceholderLoading items={20} itemClassName="test" />,
    );
    expect(container.getElementsByClassName('test').length).toBe(20);
  });

  it('renders custom content', () => {
    const { container } = render(
      <PlaceholderLoading
        items={5}
        itemClassName="test"
        placeholderContent={
          <div className="inner-test">
            <div className="inner-test"></div>
          </div>
        }
      />,
    );
    expect(container.getElementsByClassName('inner-test').length).toBe(10);
  });
});
