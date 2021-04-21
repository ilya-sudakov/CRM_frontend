import { renderHook } from '@testing-library/react-hooks';
import usePagination from './usePagination';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
  useHistory: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}));

describe('usePagination', () => {
  it('correct static pagination', () => {
    const test = [1, 2, 3];
    const testFunction = () => [...test];
    const { result } = renderHook(() =>
      usePagination(testFunction, [], 'static'),
    );
    expect(result.current.data.length).toBe(3);
  });

  it('correct default(static) pagination', () => {
    const test = [1, 2, 3];
    const testFunction = () => [...test];
    const { result } = renderHook(() => usePagination(testFunction, []));
    expect(result.current.data.length).toBe(3);
  });

  //   it("correct dynamic pagination", () => {
  //     const test = [1, 2, 3];
  //     const testFunction = async () => await Promise.all(test);
  //     const { result } = renderHook(() =>
  //       usePagination(() => testFunction(), [], "dynamic")
  //     );
  //     expect(result.current.data.length).toBe(3);
  //   });
});
