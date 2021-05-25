import { useEffect } from 'react';
import { Menu, Table, Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import {
  enableDisableLinkAction,
  managelistChangePageAction,
  manageListQueryListAction,
} from '../../Store/managelinks.store';
import Switch from 'react-switch';
import { TableFooter } from '../../Component';

const ManageLinks = () => {
  const { items, content, limit } = useAppSelector((state) => state.managelinks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(manageListQueryListAction({ items }));
  }, [items, dispatch]);

  const changePage = (type: 'prev' | 'next') => {
    const page = type === 'prev' ? Math.max(10, items - 10) : items + 10;
    dispatch(managelistChangePageAction({ page }));
  };

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          {['Download-Id', 'path', 'status'].map((value, key) => (
            <Table.HeaderCell key={key} style={{ textAlign: 'center' }}>
              {value}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {content.length > 0
          ? content.map(({ download_name, path_of_file, status, id }, index) => {
              return (
                <Table.Row id={index + path_of_file + id}>
                  <Table.Cell style={{ textAlign: 'center' }}>
                    <a href={`../download/${download_name}`} target="blank">
                      {download_name}
                    </a>
                  </Table.Cell>
                  <Table.Cell style={{ textAlign: 'center' }}>{path_of_file}</Table.Cell>
                  <Table.Cell
                    style={{ textAlign: 'center' }}
                    onClick={() => dispatch(enableDisableLinkAction({ action: status === 'Y' ? 'N' : 'Y', id }))}
                  >
                    <Switch
                      onChange={() => {}}
                      checked={status === 'Y'}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#000"
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })
          : 'no items'}
      </Table.Body>
      <TableFooter
        prevDisabled={items <= 10}
        nextDisabled={items >= limit}
        prev={() => changePage('prev')}
        next={() => changePage('next')}
      />
    </Table>
  );
};

export default ManageLinks;
