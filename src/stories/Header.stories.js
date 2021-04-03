import Header from 'Components/Header/Header.jsx';
import UserContext from '../App.js';

export default {
  title: 'Header',
  component: Header,
  decorators: [
    (storyFn) => {
      return (
        <UserContext.Provider
          value={{
            newNotifications: 0,
            lastNotification: {},
            userData: { username: 'Имя пользователя' },
            userHasAccess: () => true,
          }}
        >
          {storyFn()}
        </UserContext.Provider>
      );
    },
  ],
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
