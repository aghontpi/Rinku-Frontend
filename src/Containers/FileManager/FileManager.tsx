import React, { useEffect, useState } from 'react';
import FileBrowser from 'react-keyed-file-browser';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import { createDownloadLinkAction, getCommandAction } from '../../Store/filemanager.store';
import 'react-keyed-file-browser/dist/react-keyed-file-browser.css';
import { Modal } from '../../Component';
import { ModalOpen } from '../../Store/modal.store';
import { ModalContent } from './modalContent';

const FileManager = () => {
  const { files, config } = useAppSelector((state) => state.filemanager);
  type FileInfo = typeof files[0];
  const [fileInfo, setFileInfo] = useState<null | FileInfo>(null);
  const dispatch = useAppDispatch();

  // component mount, fetch the list from server,
  useEffect(() => {
    dispatch(getCommandAction(config));
  }, []);

  // selecting a file in filemanager
  const onFileSelect = (props: FileInfo) => {
    setFileInfo(props);
    dispatch(ModalOpen());
  };

  // btn click to generate download link
  const buttonClick = () => fileInfo?.key && dispatch(createDownloadLinkAction({ filepath: fileInfo?.key }));

  return (
    <>
      {files && <FileBrowser files={JSON.parse(JSON.stringify(files))} onSelectFile={onFileSelect} />}
      <Modal
        header="Info"
        actions={null}
        content={
          <ModalContent
            {...{
              fileInfo,
              buttonClick,
            }}
          />
        }
      />
    </>
  );
};

export { FileManager };
