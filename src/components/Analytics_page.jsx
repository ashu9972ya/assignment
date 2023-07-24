import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./analytics.css";
import Table from "./Table";
import { fetchApiData } from "../Action/apiSlice";

const Analytics_page = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isShow, setShow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const initialFields = [
    "date",
    "App",
    "Ad requests",
    "Ad responses",
    "impressions",
    "clicks",
    "revenue",
    "fill rate",
    "ctr",
  ];

  const dispatch = useDispatch();
  const [isTableVisible, setTableVisible] = useState(false); // State to control table visibility

  const [fields, setFields] = useState(
    initialFields.map((field, index) => ({
      name: field,
      selected: true,
    }))
  );

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragEnter = (event, index) => {
    event.preventDefault();
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
  };

  const handleDrop = (event, dropIndex) => {
    const draggedIndex = event.dataTransfer.getData("text");
    const updatedFields = [...fields];
    const draggedField = updatedFields[draggedIndex];

    updatedFields.splice(draggedIndex, 1);
    updatedFields.splice(dropIndex, 0, draggedField);

    setFields(updatedFields);
  };

  const handleItemClick = (index) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        field.name === "date" || field.name === "App"
          ? { ...field, selected: true } // Ensure "date" and "App" are always selected
          : i === index
          ? { ...field, selected: !field.selected } // Toggle selection for other fields
          : field
      )
    );
  };

  const handleApplyChanges = (selectedFields) => {
    setFields(selectedFields);
  };

  const handleDatePickerToggle = () => {
    setDatePickerVisible((prevState) => !prevState);
  };
  const handleSettingToggle = () => {
    setShow((prevState) => !prevState);
  };

  const handleCancelClick = () => {
    setStartDate("");
    setEndDate("");
    setDatePickerVisible(false);
  };
  const handleCloseClick = () => {
    setShow(false);
  };

  const handleSubmit = (event) => {
    setDatePickerVisible(false); // Hide the date picker after submitting the form

    event.preventDefault();
    setTableVisible(true);
    dispatch(fetchApiData({ startDate, endDate }));
  };

  return (
    <div className="Analytics">
      <aside className="sideContent"></aside>
      <div className="container">
        <div className="main">
          <h2 className="heading">Analytics</h2>
          <div className="filterContainer">
            <div className="filterContainer-MainSection">
              <button
                className="filterContainer-DatePickerRegion"
                onClick={handleDatePickerToggle}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3zm344-208a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24z"></path>
                </svg>
                <p>
                {!isDatePickerVisible
              ? startDate && endDate
                ? startDate + " - " + endDate
                : "Select Date"
              : "Date Picker"}
                </p>
              </button>
              {isDatePickerVisible && (
                <form className="datePickerContainer" onSubmit={handleSubmit}>
                  <div>
                    <div className="datePickerContainer-label">
                      <label htmlFor="startDate">Start Date</label>
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      min="2021-06-01"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="datePickerContainer-label">
                      <label htmlFor="endDate">End Date</label>
                    </div>
                    <input
                      type="date"
                      name="endDate"
                      min="2021-06-31"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="datePickerContainer-footer">
                    <button
                      className="cancelButton"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button className="applyButton">Search</button>
                  </div>
                </form>
              )}
              <button
                className="filterContainer-SettingsRegion"
                onClick={handleSettingToggle}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="icon"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 7H3V2h1v5zm-1 7h1v-3H3v3zm5 0h1V8H8v6zm5 0h1v-2h-1v2zm1-12h-1v6h1V2zM9 2H8v2h1V2zM5 8H2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1zm5-3H7c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1zm5 4h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1z"
                  ></path>
                </svg>{" "}
                Settings
              </button>
            </div>
          </div>
          {isShow && (
            <div className="settingsContainer">
              <h5 className="secondary-heading">Dimensions and Metrics</h5>
              <div className="settingsContainer-DragZone">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className={`settingsContainer-fields ${
                      field.selected ? "selected" : ""
                    }`}
                    draggable
                    onClick={() => handleItemClick(index)}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragEnter={(event) => handleDragEnter(event, index)}
                    onDragOver={(event) => handleDragOver(event, index)}
                    onDrop={(event) => handleDrop(event, index)}
                  >
                    {field.name}
                  </div>
                ))}
              </div>
              <div className="settingsContainer-footer">
                <div className="cancelButton" onClick={handleCloseClick}>
                  Close
                </div>
                <div
                  className="applyButton"
                  onClick={() => handleApplyChanges(fields)}
                >
                  Apply Changes
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="tableContainer">
          {!isTableVisible && (
            <div className="tableContainer-EmptyContent">
              <div className="tableContainer-EmptyImage">
                <img
                  className="error"
                  src="../assets/error-Image.svg"
                  alt="error"
                />
              </div>
              <div className="tableContainer-EmptyBody">
                <h3>Hey! Something's off!</h3>
                <h3>We couldn't display the given data</h3>
                <p>Try changing your filters or selecting a different date</p>
              </div>
            </div>
          )}
          {isTableVisible && (
            <Table
              initialFields={initialFields}
              selectedFields={fields}
              onApplyChanges={handleApplyChanges}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics_page;
