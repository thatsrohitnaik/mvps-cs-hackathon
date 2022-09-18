import { makeAutoObservable, toJS } from "mobx";
import { get, post } from "../util/rest";
import { api } from "../util/api";

class Store {
  loading = false;
  user = null;
  toBeAllocated = new Map();
  data = null;
  building = [];
  needsAllocation = [];
  alreadyAlloted = [];
  hasTobeAlloted = [];

  constructor() {
    makeAutoObservable(this);
    this.getProfile();
    this.getSpaceAllocationData2();
  }

  getProfile = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return response.data;
  };

  setToBeAllocatedList = (value) => {
    value != null &&
      this.toBeAllocated.set(value.to.code, {
        code: value.to.code,
        seatNo: value.seatNo,
        date: value.date,
        name: value.to.name,
      });
  };

  setAllToBeAllocatedList = (data) => {
    data.map(({ seatNo, date, to }) => {
      this.toBeAllocated.set(to.code, {
        code: to?.code,
        seatNo,
        date,
        name: to?.person,
      });
    });
  };

  getAllocatesSize = () => {
    return this.toBeAllocated.size;
  };

  gettoBeAllocated() {
    return Array.from(toJS(this.toBeAllocated), ([name, value]) => ({
      name,
      value,
    }));
  }

  getBuildingPlan = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return this.user;
  };

  getSpaceAllocationData = async () => {
    const response = await get(api.getWingAllocation);
    console.log(response.data, "ss");
    return response.data;
  };

  getSpaceAllocationData2 = async () => {
    const response = await get(api.getBuildingDataAsPerAccess);
    this.building = response.data;
    const a = [];
    response.data.map((f) => {
      f.wing.map((z) => {
        z.seats.map((s) => {
          if (s.allocatedTo != null) {
            if (s.allocatedTo.team == this.user.team.name) {
              a.push(s.allocatedTo);
            }
          }
        });
      });
    });
    this.alreadyAlloted = a;
    const b = a?.map((i) => i.code);
    const c =[]
    toJS(this.user)?.team?.members.map((t) => {
      if (!b.includes(t.code)) {
        c.push(t);
      }
    });
    this.hasTobeAlloted = c;
    return response.data;
  };

  getBuilding = () => {
    const abc = toJS(this.building);
    return abc;
  };

  saveSeats = async () =>{
    const edithedBulding = this.getBuilding().map((f) => {
        f.wing.map((z) => {
            z.seats.map((s) => {
              if (s.status == 'S') {
                s.status = 'B';
              }
              return s;
            });
          return z;
        });
      return f;
    });
    this.building = edithedBulding;
      const response = await post(api.saveSeats, edithedBulding);
      console.log(response.data, "ss");
  }

  setSeat = (floor, zone, seatNo, status, to) => {
    const edithedBulding = this.getBuilding().map((f) => {
      if (f.floor == floor) {
        f.wing.map((z) => {
          if (z.name == zone) {
            z.seats.map((s) => {
              if (s.seatNo == seatNo) {
                s.status = status;
                s.allocatedTo = to;
              }
              return s;
            });
          }
          return z;
        });
      }
      return f;
    });

    const a  = toJS(this.hasTobeAlloted)
    const b = a.filter(h=>{
              if(h.code!= to.code){
                return true;
              }
    })
    this.hasTobeAlloted = b;
    debugger;
    this.building = edithedBulding;
  };
}

export default Store;
