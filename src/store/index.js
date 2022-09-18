import { makeAutoObservable, toJS } from 'mobx';
import { get } from '../util/rest';
import { api } from '../util/api';

class Store {
  loading = false;
  user = null;
  toBeAllocated = new Map();
  data = null;

  constructor() {
    makeAutoObservable(this);
    this.getProfile();
  }

  getProfile = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return response.data;
  };

  setToBeAllocatedList = (value) =>{
    value!=null && this.toBeAllocated.set(value.to.code, {code: value.to.code, seatNo: value.seatNo, date: value.date, name: value.to.name})
  }


  setAllToBeAllocatedList = (data) =>{
    data.map(({seatNo,date,to})=>{
      this.toBeAllocated.set(to.code, {code: to?.code, seatNo, date, name: to?.person})
    })
  }

  getAllocatesSize = ()=>{
return this.toBeAllocated.size;
  }

  gettoBeAllocated(){
    return Array.from(toJS(this.toBeAllocated), ([name, value]) => ({ name, value }));
  }

  getBuildingPlan = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return this.user;
  };

  getSpaceAllocationData = async () => {
    const response = await get(api.getWingAllocation);
    this.data = response.data;
    return response.data;
  };
}

export default Store;
