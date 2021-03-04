import TasksList from './TasksList.jsx';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  dateDiffInDays,
  formatDateStringNoYear,
} from '../../../../../utils/functions.jsx';
import { renderWithRouter } from '../../../../../utils/testing/functions.js';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('TasksList component', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { asFragment } = render(<TasksList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders w/o props', () => {
    render(<TasksList />);
  });

  it('renders loading', () => {
    render(<TasksList isLoading={true} />);
  });

  it('renders tasks list', async () => {
    const tasks = [
      {
        id: 1,
        description: 'asd',
        condition: '',
        status: '',
        dateControl: new Date(2019, 10, 12),
        dateCreated: new Date(2020, 10, 12),
      },
      {
        id: 2,
        description: '123',
        condition: '',
        status: null,
        dateControl: new Date(2019, 10, 12),
        dateCreated: new Date(2020, 10, 12),
      },
      {
        id: 3,
        description: 'zzz',
        condition: '',
        status: 'cvnbcvb',
        dateControl: new Date(2200, 10, 12),
        dateCreated: new Date(2120, 10, 12),
      },
    ];

    const controlDates = {
      [new Date(2019, 10, 12)]: [...tasks],
      [new Date(2200, 10, 12)]: [tasks[2]],
    };

    renderWithRouter(
      <TasksList
        userHasAccess={() => true}
        controlDates={controlDates}
        tasks={tasks}
      />,
    );
    expect(await screen.findByText('asd')).toBeInTheDocument();
    expect(await screen.findByText('123')).toBeInTheDocument();
    fireEvent.click(
      document.getElementsByClassName('list-item__general-info')[0],
    );
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/dispatcher/general-tasks/edit/1',
    );
  });

  it('renders expired task', async () => {
    const tasks = [
      {
        id: 1,
        description: 'asd',
        condition: '',
        status: '',
        dateControl: new Date(2019, 10, 12),
        dateCreated: new Date(2020, 10, 12),
      },
    ];

    const controlDates = { [new Date(2019, 10, 12)]: [...tasks] };

    renderWithRouter(
      <TasksList
        userHasAccess={() => true}
        controlDates={controlDates}
        tasks={tasks}
      />,
    );
    expect(
      await screen.findByText(
        `до ${formatDateStringNoYear(
          new Date(2019, 10, 12),
        )} - опоздание ${dateDiffInDays(
          new Date(2019, 10, 12),
          new Date(),
        )} дн.`,
      ),
    ).toBeInTheDocument();
  });
});
