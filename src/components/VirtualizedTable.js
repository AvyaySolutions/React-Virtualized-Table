import React from 'react'
import { Table, WindowScroller, AutoSizer } from 'react-virtualized'
import styled from 'styled-components'
import 'react-virtualized/styles.css'


const TableWrapper = styled.div`
  .ReactVirtualized__Table {
  }

  .ReactVirtualized__Table__Grid {
    outline: none;
  }

  .ReactVirtualized__Table__headerColumn {
	  color: navy;
  }

  .ReactVirtualized__Table__headerRow {
	  background: palevioletred;
	  border: 1px solid gray;
  }

  .ReactVirtualized__Table__row {
    background: papayawhip;
	  border-right: 1px solid gray;
    border-left: 1px solid gray;
    border-bottom: 1px solid gray;
  }

  .ReactVirtualized__Table__rowColumn {
  }

  .ReactVirtualized__Table__sortableHeaderColumn {
  }

  .ReactVirtualized__Table__sortableHeaderIcon {
  }
`

const VirtualizedTable = ({ rows, ...props }) => (
  <TableWrapper>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
        //   rowGetter={({ index }) => rows[index]}
          {...props}
        />
      )}
    </AutoSizer>
  </TableWrapper>
)

export default VirtualizedTable