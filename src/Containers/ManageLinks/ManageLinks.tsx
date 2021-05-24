import { useEffect } from 'react';
import { Menu, Table, Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import {
  enableDisableLinkAction,
  managelistChangePageAction,
  manageListQueryListAction,
} from '../../Store/managelinks.store';
import Switch from 'react-switch';

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
          <Table.HeaderCell style={{ textAlign: 'center' }}>Download-Id</Table.HeaderCell>
          <Table.HeaderCell style={{ textAlign: 'center' }}>path</Table.HeaderCell>
          <Table.HeaderCell style={{ textAlign: 'center' }}>status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {content.length > 0
          ? content.map(({ download_name, path_of_file, status, id }, index) => {
              return (
                <Table.Row>
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
                      id={index + path_of_file}
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
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Menu floated="right" pagination>
              <Menu.Item as="a" icon onClick={() => changePage('prev')} disabled={items <= 10}>
                <Icon name="chevron left"></Icon>
              </Menu.Item>
              <Menu.Item as="a" icon onClick={() => changePage('next')} disabled={items >= limit}>
                <Icon name="chevron right"></Icon>
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default ManageLinks;
