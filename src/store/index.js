import { makeAutoObservable } from 'mobx';
import { get } from '../util/rest';
import { api } from '../util/api';

class Store {
  loading = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
    this.getProfile();
  }

  getProfile = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return response.data;
  };

  getBuildingPlan = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return this.user;
  };

  getSpaceAllocationData = async () => {
    const response = await get(api.getWingAllocation);
    console.log(response.data,"ss")
    return response.data;
  };
}

export default Store;
