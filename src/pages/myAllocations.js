import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TabPanel from "../components/TabPanel/";
import Hall from "../components/Hall/";
import "./style.css";
import { getChair } from "../util/helper";
import { StoreContext } from "../context/";

function a11yProps(index1, index2) {
  return {
    id: `simple-tab-${index1}-${index2}`,
    "aria-controls": `simple-tabpanel-${index1}-${index2}`,
  };
}

export default function MyAllocation(props) {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [list, setList] = React.useState([]);
  const { store } = React.useContext(StoreContext);
  const { user } = props;

  if (props.building == null) {
    return null;
  }
  const getAddToList = (list) => {
    setList(list);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  if (props == null) {
    return null;
  }

  return (
    <>
      <span> {user?.team?.name},</span>
      <span>
        {" "}
        Level Access :{" "}
        {props?.building.map((t) => {
          return <span> {t?.floor} </span>;
        })}{" "}
      </span>
      <span>
        {" "}
        ,Quota : {user?.team?.quota}/{user?.team?.members?.length}
      </span>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {props?.building?.map((t, index) => {
              return (
                <Tab key={index} label={t?.floor} {...a11yProps(index, 0)} />
              );
            })}
          </Tabs>
        </Box>

        {props?.building.map((t, index) => {
          return (
            <TabPanel key={index} value={value} index1={index} index2={0}>
              <Box sx={{ width: "100%", padding: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value2}
                    onChange={handleChange2}
                    aria-label="basic tabs example"
                  >
                    {t?.wing?.map((k, i = index) => {
                      return (
                        <Tab
                          key={i}
                          label={k.name}
                          {...a11yProps(index, i + 1)}
                        />
                      );
                    })}
                  </Tabs>
                </Box>
                <TabPanel key="1" value={value2} index1={0} index2={index + 1}>
                  <br />
                  <Hall
                    building={props.building}
                    floor={t.floor}
                    zone="A"
                    user={props?.user}
                    getAddToList={getAddToList}
                  />
                </TabPanel>
                <TabPanel key="2" value={value2} index1={1} index2={index + 1}>
                  <br />
                  <Hall
                    building={props.building}
                    floor={t.floor}
                    zone="B"
                    user={props?.user}
                    getAddToList={getAddToList}
                  />
                </TabPanel>
                <TabPanel key="3" value={value2} index1={2} index2={index + 1}>
                  <br />
                  <Hall
                    building={props.building}
                    floor={t.floor}
                    zone="C"
                    user={props?.user}
                    getAddToList={getAddToList}
                  />
                </TabPanel>
                <TabPanel key="4" value={value2} index1={3} index2={index + 1}>
                  <br />
                  <Hall
                    building={props.building}
                    floor={t.floor}
                    zone="D"
                    user={props?.user}
                    getAddToList={getAddToList}
                  />
                </TabPanel>
              </Box>
            </TabPanel>
          );
        })}
      </Box>
      {list != null &&
        list.map((a) => {
          const m = a.value.seatNo + " : " + a.value.name;
          return <Chip key={a.value.seatNo} label={m} sx={{ m: 1 }} />;
        })}
      <br />
      <div>
        <Button
          variant="contained"
          onClick={() => {
            store.saveSeats();
          }}
          sx={{ m: 1 }}
        >
          Save
        </Button>
        <br />
        <br />
        <p>
          <img src={getChair("A")} className="img-icon" /> Available{" "}
          <img src={getChair("S")} className="img-icon" /> Selected{" "}
          <img src={getChair("B", "A", "C")} className="img-icon" /> Booked
        </p>
      </div>
    </>
  );
}
