import React, { Component } from 'react'
import { render } from 'react-dom'
import { Column, SortDirection } from 'react-virtualized'
import styled from 'styled-components'
import _ from "lodash";
import VirtualizedTable from './VirtualizedTable'
import Paginator from './Paginator';
// import { getRows } from './utils'
import DATA from '../REAL_DATA.json';


// const count = 100000
// const rows = getRows(count)
const list = DATA;

const Wrapper = styled.div`
  margin: 10px;
`

class TrialTable extends Component {
  constructor() {
    super()
//-->
    const sortBy = "name";
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({ sortBy, sortDirection });

    // this.state = {
    //   sortBy,
    //   sortDirection,
    //   sortedList
    // };
// <--


    this.state = { 
      page: 1, 
      perPage: 18, 
      scrollToIndex: undefined ,
      sortBy,
        sortDirection,
        sortedList 
    }
    this.handleRowsScroll = this.handleRowsScroll.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleRowsScroll({ stopIndex }) {
    this.setState(prevState => {
      const page = Math.ceil(stopIndex / prevState.perPage)
      return { page, scrollToIndex: undefined }
    })
  }

  handlePageChange(page) {
    this.setState(prevState => {
      const scrollToIndex = (page - 1) * prevState.perPage
      return { page, scrollToIndex }
    })
  }

  render() {
    const { page, perPage, scrollToIndex } = this.state

    const headerHeight = 30
    const rowHeight = 40
    const height = rowHeight * perPage + headerHeight
    const rowCount = list.length  //*
    const pageCount = Math.ceil(rowCount / perPage)

    return (
      <Wrapper>
        <h1>React virtualized table</h1>
        <p>
          <Paginator
            pageCount={pageCount}
            currentPage={page}
            onPageChange={this.handlePageChange}
          />
        
        </p>
        <VirtualizedTable
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          height={height}
          // rowCount={rowCount}
          rows={list} //*
//-->
          sort={this._sort}
              sortBy={this.state.sortBy}
              sortDirection={this.state.sortDirection}
              rowCount={this.state.sortedList.length}
              rowGetter={({ index }) => this.state.sortedList[index]}
//<--
          onRowsRendered={this.handleRowsScroll}
          scrollToIndex={scrollToIndex}
          scrollToAlignment='start'
        >
              
        <Column label='Confidence' dataKey='Confidence' width={200} /> 
      <Column label='Prediction' dataKey='Prediction' width={200} />
      <Column label='MATNR' dataKey='MATNR' width={200} /> 
      <Column label='MAKTX' dataKey='MAKTX' width={200} /> 
      <Column label='Tariff_Code' dataKey='Tariff_Code' width={200}  />          
      <Column label='Prediction 2' dataKey='Prediction 2' width={200} /> 
      <Column label='Prediction 3' dataKey='Prediction 3' width={200} /> 
      <Column label='Confidence 2' dataKey='Confidence 2' width={200} /> 
      <Column label='Confidence 3' dataKey='Confidence 3' width={200} /> 

        </VirtualizedTable>
      </Wrapper>
    )
  }
//-->
  _sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };
//<--
}

export default  TrialTable;
