import React from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

interface TableFooterProps {
  prev: () => void;
  next: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

const TableFooter = ({ prev, next, prevDisabled, nextDisabled }: TableFooterProps) => {
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell colSpan="10">
          <Menu floated="right" pagination>
            <Menu.Item as="a" icon onClick={() => prev()} disabled={prevDisabled}>
              <Icon name="chevron left"></Icon>
            </Menu.Item>
            <Menu.Item as="a" icon onClick={() => next()} disabled={nextDisabled}>
              <Icon name="chevron right"></Icon>
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default TableFooter;
