
import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // Merge timestamps data with mockData based on the order ID
  const mergedData = mockData.results.map((order) => {
    const id = order["&id"];
    const matchingTimeStamp = timestamps.results.find(
      (timestamp) => timestamp["&id"] === id
    );
    return {
      ...order,
      orderSubmitted: matchingTimeStamp?.timestamps?.orderSubmitted || "",
    };
  });

  // Filter orders based on search text
  const filteredData = mergedData.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${filteredData.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        {/* Use filteredData instead of mergedData */}
        <List rows={filteredData} selectedCurrency={currency} />
      </div>
    </div>
  );
};

export default Dashboard;
