import React, { Component } from "react";
import { render } from "react-dom";
import { Column, SortDirection } from "react-virtualized";
import styled from "styled-components";
import _ from "lodash";
import VirtualizedTable from "./VirtualizedTable";
import Paginator from "./Paginator";
import DATA from "./REAL_DATA.json";
import * as XLSX from "xlsx";

// const fileType = [
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// ];

const Wrapper = styled.div`
  margin: 10px;
`;

class Table extends Component {
  constructor(props) {
    super(props);
    const sortBy = "name";
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({ sortBy, sortDirection });
    // const fileType = [
    //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //      ];

    this.state = {
      page: 1,
      perPage: 18,
      scrollToIndex: undefined,
      sortBy,
      sortDirection,
      sortedList,
      excelFile: null,
      excelData: [],
      // excelFileError: null, //
      // fileType
      fileType : [
           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
         ],
    };

    this.handleRowsScroll = this.handleRowsScroll.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleRowsScroll({ stopIndex }) {
    this.setState((prevState) => {
      const page = Math.ceil(stopIndex / prevState.perPage);
      return { page, scrollToIndex: undefined };
    });
  }

  handlePageChange(page) {
    this.setState((prevState) => {
      const scrollToIndex = (page - 1) * prevState.perPage;
      return { page, scrollToIndex };
    });
  }

  //-->

  handleFile(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && this.state.fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          // setExcelFileError(null);
          // this.setState({ excelFileError : null});//
          // setExcelFile(e.target.result);
          this.setState({excelFile : e.target.result});
          console.log("file uploaded")
        };
      } else {
        // setExcelFileError("Please select only excel file types");
        // this.setState({ excelFileError : "Please select only excel file types"});
        // setExcelFile(null);
        this.setState({ excelFile : [] });
      }
    } else {
      console.log("plz select your file");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.excelFile !== null) {
      const workbook = XLSX.read(this.state.excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const deta = XLSX.utils.sheet_to_json(worksheet);
      // setExcelData(deta);
      this.setState({ excelData : deta });
      //   setDisplay(true);
    } else {
      // setExcelData(null);
      this.setState({ excelData : null });
      // alert(this.excelFileError);//

      console.log("file ready to render");
    }
  }

  //<--

  render() {
    const { page, perPage, scrollToIndex } = this.state;

    const headerHeight = 30;
    const rowHeight = 40;
    const height = rowHeight * perPage + headerHeight;
    const rowCount = this.state.excelData.length; //*
    const pageCount = Math.ceil(rowCount / perPage);
    return (
      <>
        <form
          className="form-group"
          autoComplete="off"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className="file-input">
            <label htmlFor="file">
              Select file
              <p className="file-name"></p>
            </label>
            <input
              type="file"
              id="file"
              className="file"
              onChange={(e) => this.handleFile(e)}
              required
            />
          </div>
          <button
            type="submit"
            className="submitB"
            style={{ marginTop: 5 + "px" }}
          >
            Submit
          </button>
        </form>

        <Wrapper>
          <h1>React virtualized table</h1>
          <p>
            <Paginator
              pageCount={pageCount}
              currentPage={page}
              // onPageChange={(e)=>this.handlePageChange(e)}
              onPageChange={this.handlePageChange}
            />
          </p>
          <VirtualizedTable
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            height={height}
            // rowCount={rowCount}
            rows={this.state.excelData} //*
            //-->
            sort={this._sort}
            sortBy={this.state.sortBy}
            sortDirection={this.state.sortDirection}
            rowCount={this.state.sortedList.length}
            rowGetter={({ index }) => this.state.sortedList[index]}
            //<--
            onRowsRendered={this.handleRowsScroll}
            scrollToIndex={scrollToIndex}
            scrollToAlignment="start"
          >
            <Column label="Confidence" dataKey="Confidence" width={200} />
            <Column label="Prediction" dataKey="Prediction" width={200} />
            <Column label="MATNR" dataKey="MATNR" width={200} />
            <Column label="MAKTX" dataKey="MAKTX" width={200} />
            <Column label="Tariff_Code" dataKey="Tariff_Code" width={200} />
            <Column label="Prediction 2" dataKey="Prediction 2" width={200} />
            <Column label="Prediction 3" dataKey="Prediction 3" width={200} />
            <Column label="Confidence 2" dataKey="Confidence 2" width={200} />
            <Column label="Confidence 3" dataKey="Confidence 3" width={200} />
          </VirtualizedTable>
        </Wrapper>
      </>
    );
  }
  //-->
  _sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(this.excelData, [sortBy]);
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

export default Table;
