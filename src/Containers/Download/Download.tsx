import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import {
  queryFileInfoAction,
  receiveFileIdAction,
  queryDownloadFileAction,
  receiveFileErrorAction,
} from '../../Store/download.store';
import folder from './folder.webp';
import style from './download.module.css';
import { byteToReadable } from '../../Utils';

interface DownloadPageProps extends RouteComponentProps<{ fileid: string }> {}

const DownloadPage = ({ match }: DownloadPageProps) => {
  const dispatch = useAppDispatch();
  const { fileid, filename, filesize, error, loading } = useAppSelector((state) => state.download);

  useEffect(() => {
    if (match) {
      const {
        params: { fileid },
      } = match;
      dispatch(receiveFileIdAction({ fileid }));
      dispatch(queryFileInfoAction({ fileid }));
    }
    return () => {
      dispatch(receiveFileErrorAction({ error: '' }));
    };
  }, []);

  return (
    <div className={style.page_container}>
      {!error && (
        <div className={style.download_image}>
          <img src={folder} alt="downloadIcon" />
        </div>
      )}

      <div className={style.file_details}>
        {error ? (
          <div>
            <span style={{ color: 'red' }}> {error}</span>
          </div>
        ) : (
          <div>
            <span>{filename}</span>
            <span>{byteToReadable(filesize)}</span>
          </div>
        )}
      </div>
      <div
        onClick={() => !error && dispatch(queryDownloadFileAction({ fileid }))}
        className={style.download_button}
        style={error ? { borderColor: 'grey', cursor: 'default', opacity: 0.5 } : {}}
      >
        <div>
          <span style={error ? { color: 'grey' } : {}}>{loading ? 'Loading..' : 'Download'}</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DownloadPage);
