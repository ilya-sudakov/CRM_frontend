import FileUploader from 'Utils/Form/FileUploader/FileUploader.jsx';

export default {
  title: 'Form/FileUploader',
  component: FileUploader,
};

const Template = (args) => <FileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithLoadedFile = Template.bind({});
WithLoadedFile.args = {
  defaultValue: [
    {
      url:
        'https://194-58-104-192.ovz.vps.regruhosting.ru:8443/api/v1/fileWithoutDB/downloadFile/pexels-ivy-son-3490393.jpg',
    },
  ],
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  multipleFiles: true,
};

export const CustomRegex = Template.bind({});
CustomRegex.args = {
  multipleFiles: true,
  regex: /.+\.(xlsx|csv)/,
};
