import React, { CSSProperties, ReactNode, useEffect } from 'react';
import { Button, Placeholder } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import { queryFileStatusAction, receiveFileStatusAction } from '../../Store/filemanager.store';
import { RootState } from '../../Store/store';

interface ModalContentProps {
  fileInfo: RootState['filemanager']['files'][0] | null;
  buttonClick: () => void;
}

const ModalContent = ({ fileInfo, buttonClick }: ModalContentProps) => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.modal);
  const { file, downloadName } = useAppSelector((state) => state.filemanager.fileinfo);

  // during mount or file change, querystatus from server.
  useEffect(() => {
    if (fileInfo?.key && open) {
      dispatch(queryFileStatusAction({ filepath: fileInfo.key }));
    }
    //reset state for fileInfo
    return () => {
      dispatch(receiveFileStatusAction({ file: '' }));
    };
  }, [open, dispatch, fileInfo?.key]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {!file && !downloadName ? (
        <Placeholder fluid>
          {[1, 2, 3, 4].map((v, k) => (
            <Placeholder.Line key={'placeholder' + v + k} />
          ))}
        </Placeholder>
      ) : (
        <>
          <Template left="File" right={fileInfo?.key || ''} />
          <Template left="Size" right={fileInfo?.size.toString() || ''} style={{ marginBottom: '16px' }} />
          {file ? (
            <Button onClick={buttonClick}>Generate ID</Button>
          ) : (
            <Template
              left="Download Link"
              right={
                <a href={`./download/${downloadName}`} target="blank">
                  {downloadName}
                </a>
              }
            />
          )}
        </>
      )}
    </div>
  );
};

const Template = (props: { left: string; right: string | ReactNode; style?: CSSProperties }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '6px', ...props.style }}>
      <div style={{ width: '46%', textAlign: 'right' }}>
        <h4>{props.left}</h4>
      </div>
      <div style={{ marginLeft: '8px', marginRight: '8px', fontWeight: 'bolder' }}>:</div>
      <div style={{ width: '50%' }}>{props.right}</div>
    </div>
  );
};

export { ModalContent };
