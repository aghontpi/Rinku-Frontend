import { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { TableFooter } from '../../Components';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import {
  downloadLogChangePageAction,
  downloadLogQueryListAction,
  receiveDownloadLogAction,
} from '../../Store/downloadlog.store';

const DownloadLog = () => {
  const { limit, total, logs } = useAppSelector((state) => state.downloadlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (limit) {
      dispatch(downloadLogQueryListAction({ limit }));
    }
  }, [limit, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(downloadLogChangePageAction({ page: 10 }));
      dispatch(receiveDownloadLogAction({ logs: [], total: 0 }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (type: 'prev' | 'next') => {
    const page = type === 'prev' ? Math.max(10, limit - 10) : limit + 10;
    dispatch(downloadLogChangePageAction({ page }));
  };

  return (
    <Table ui striped>
      <Table.Header>
        <Table.Row>
          {['Log Id', 'download id/path', 'user agent', 'ip', 'user (nick)', 'download time'].map((value, key) => (
            <Table.HeaderCell style={{ textAlign: 'center' }} key={key}>
              {value}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body style={{ textAlign: 'center' }}>
        {logs &&
          logs.map(({ download_log_id, path, id, ip, time, user, user_agent }, key) => (
            <Table.Row key={download_log_id + key}>
              <Table.Cell>{download_log_id}</Table.Cell>
              <Table.Cell>
                {
                  <a href={`../download/${path}`} target="blank">
                    {id}
                  </a>
                }
              </Table.Cell>
              <Table.Cell>{user_agent}</Table.Cell>
              <Table.Cell>{ip}</Table.Cell>
              <Table.Cell>{user}</Table.Cell>
              <Table.Cell>{time}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
      <TableFooter
        prevDisabled={limit <= 10}
        nextDisabled={limit >= total}
        prev={() => changePage('prev')}
        next={() => changePage('next')}
      />
    </Table>
  );
};

export default DownloadLog;
