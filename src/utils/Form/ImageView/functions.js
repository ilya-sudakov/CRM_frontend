import { imgToBlobDownload } from 'Utils/functions.jsx';
import axios from 'axios';

export const getFileExtension = (item) => {
  const isBase64 =
    (typeof item === 'string' && item.length > 1000) ||
    (typeof item === 'string' && item.length === 0);
  const isLocalPath = typeof item === 'string' && item.length <= 200;
  const isRemoteFile =
    typeof item === 'object' && item?.url !== undefined && item?.url !== null;
  if (isRemoteFile)
    return item?.url?.split(/\/fileWithoutDB\/downloadFile\/[^.]*./)[1];
  if (isLocalPath) return item.split('.')[1];
  if (isBase64) return item.split('image/')[1]?.split(';base64')[0];
  return item?.type?.split('/')[1] ?? 'file';
};

export const getFileName = (item) => {
  const isBase64 =
    (typeof item === 'string' && item.length > 1000) ||
    (typeof item === 'string' && item.length === 0);
  const isLocalPath = typeof item === 'string' && item.length <= 200;
  const isRemoteFile =
    typeof item === 'object' &&
    ((item?.url !== undefined && item?.url !== null) ||
      (item?.uri !== undefined && item?.uri !== null));
  const isRawFile =
    typeof item === 'object' &&
    item?.name !== undefined &&
    item?.name !== null &&
    item?.size !== undefined &&
    item?.size !== null;
  if (isRemoteFile)
    return (item?.uri || item?.url).split(/\/fileWithoutDB\/downloadFile\//)[1];
  if (isLocalPath) return item.split('assets/')[1];
  if (isBase64) return 'Просмотр';
  if (isRawFile) return item?.name;
  return item?.type?.split('/')[1] ?? 'file';
};

export const downloadImage = (
  _file,
  filename,
  responseType = 'blob',
  headers = null,
  type,
) => {
  const fileName = filename ?? getFileName(_file);
  const isLocalPath = typeof _file === 'string' && _file.length <= 200;
  const url = _file?.url || _file?.uri;
  console.log(_file, fileName);
  if (_file instanceof Blob) {
    let url = window.URL.createObjectURL(_file);
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    return;
  }
  if (_file instanceof File) {
    let url = window.URL.createObjectURL(new Blob([_file]));
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    return;
  }
  if (!url && !isLocalPath) return imgToBlobDownload(_file, fileName);
  return axios
    .get(url ?? _file, {
      headers: headers ?? undefined,
      responseType: responseType,
    })
    .then(({ data }) => {
      console.log(data);
      let url = window.URL.createObjectURL(new Blob([data], type ?? undefined));
      let a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    });
};

export const getLink = (_file) => {
  const isLocalPath = typeof _file === 'string' && _file.length <= 200;
  if (_file?.url || isLocalPath) return _file?.url ?? _file;
};

export const copyLinkToClipboard = (_file) => {
  const link = getLink(_file);
  navigator.clipboard.writeText(link);
};
