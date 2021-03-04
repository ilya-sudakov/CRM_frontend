import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary.jsx';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from '../../utils/testing/functions.js';

const ErrorTestComponent = () => ['❤'].error(); // component which throws error when rendered

describe('ErrorBoundary component', () => {
  afterEach(cleanup);

  it('renders', () => {
    render(
      <ErrorBoundary>
        <div>123</div>
      </ErrorBoundary>,
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <ErrorBoundary>
        <div>123</div>
      </ErrorBoundary>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a problem', () => {
    const { container } = renderWithRouter(
      <ErrorBoundary componentName="Тестовый компонент">
        <ErrorTestComponent />
      </ErrorBoundary>,
    );
    expect(container).toHaveTextContent('Ошибка в Тестовый компонент!');
  });

  it("reloads the page if user clicked 'reload' button", () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };
    renderWithRouter(
      <ErrorBoundary componentName="Тестовый компонент">
        <ErrorTestComponent />
      </ErrorBoundary>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(window.location.reload).toHaveBeenCalled();
  });
});
