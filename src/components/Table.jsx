import React, { useState, useEffect, useRef } from "react";
import "./table.css";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "./Overlay";
import { fetchApps } from "../Action/appSlice";

const Table = ({ initialFields, selectedFields, onApplyChanges }) => {
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [displayedFields, setDisplayedFields] = useState(selectedFields);

  const dispatch = useDispatch();
  const {
    apps,
    loading: appsLoading,
    error: appsError,
  } = useSelector((state) => state.apps);
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    setDisplayedFields(selectedFields);
  }, [selectedFields]);

  const handleHeaderClick = (headerName) => {
    console.log(headerName);
    // const index = displayedFields.findIndex(
    //   (field) =>
    //     field.name.trim().toLowerCase() === headerName.trim().toLowerCase()
    // );
    setSelectedHeader(headerName);
  };

  const handleCloseOverlay = () => {
    setSelectedHeader(null);
  };

  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  if (loading || appsLoading) {
    return <div>Loading...</div>;
  }

  if (appsError) {
    return <div>Error: {appsError?.message}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString("en-US");
  };

  const calculateFillRate = (requests, responses) => {
    if (responses === 0) return 0;
    const fillRate = (requests / responses) * 100;
    return Math.floor(fillRate);
  };

  const calculateCTR = (clicks, impressions) => {
    if (isNaN(clicks) || isNaN(impressions) || impressions === 0) return 0;
    const ctr = (clicks / impressions) * 100;
    return Math.floor(ctr);
  };

  const renderOverlayContent = () => {
    if (selectedHeader === "App") {
      return (
        <>
          <p>Select App</p>
          <input
            name="query"
            type="text"
            className="query__input"
            placeholder="Type to search"
            value="ass"
            onChange={handleSearch}
          />
          <div className="overlayFilters-Contents">
            <div>
              <h5>Panda Draw</h5>
              <p>123456</p>
            </div>
            <div>
              <h5>Number Ninja</h5>
              <p>789652</p>
            </div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if (selectedHeader === "Ad requests") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "Ad responses") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "impressions") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "impressions") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "clicks") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "revenue") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "fill rate") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    } else if  (selectedHeader === "ctr") {
      return (
        <>
          <input type="range" min="1000309" max="1099847" />
          <div className="overlayFilters-Contents">
            <div>1000309</div>
            <div>1099847</div>
          </div>
          <div className="overlayFilters-Footer">
            <button className="cancelButton">Reset</button>
            <button className="applyButton">Apply</button>
          </div>
        </>
      );
    }
    return null;
  };

  const handleSearch = () => {
    console.log("hello");
  };
  return (
    <>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              {displayedFields.map(
                (field, index) =>
                  field.selected && (
                    <>
                      <th
                        className={`headerCellName ${
                          !field.selected ? "hidden" : ""
                        }`}
                        key={index}
                        onClick={() => handleHeaderClick(field.name)}
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
                          <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
                        </svg>
                        <p>{field.name}</p>
                      </th>
                    </>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="totalValues">{data.length}</td>
              <td className="totalValues">{apps.length}</td>
              <td className="totalValues">162.8M</td>
              <td className="totalValues">162.8M</td>
              <td className="totalValues">162.7M</td>
              <td className="totalValues">162.6M</td>
              <td className="totalValues">$18.9K</td>
              <td className="totalValues">100.00%</td>
              <td className="totalValues">99.95%</td>
            </tr>
            {data.map((analytics, index) => {
              return (
                <>
                  {apps.map((app) => (
                    <tr key={app.app_id}>
                      <td>{formatDate(analytics.date)}</td>
                      <td>
                        <div className="appBox">
                          <img src="./assets/app-image.png" />
                          <p>{app.app_name}</p>
                        </div>
                      </td>
                      <td>{formatNumberWithCommas(analytics?.requests)}</td>
                      <td>{formatNumberWithCommas(analytics?.responses)}</td>
                      <td>{formatNumberWithCommas(analytics?.impressions)}</td>
                      <td>{formatNumberWithCommas(analytics?.clicks)}</td>
                      <td>${analytics?.revenue.toFixed(2)}</td>
                      <td>
                        {calculateFillRate(
                          analytics.requests,
                          analytics.responses
                        )}
                        %
                      </td>
                      <td>
                        {calculateCTR(analytics.clicks, analytics.impressions)}%
                      </td>
                    </tr>
                  ))}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <Overlay
        isOpen={selectedHeader !== null}
        content={renderOverlayContent()}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default Table;
