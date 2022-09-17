import { makeAutoObservable } from 'mobx';
import { get } from '../util/rest';
import { api } from '../util/api';

class Store {
  loading = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  getProfile = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return this.user;
  };

  getBuildingPlan = async () => {
    const response = await get(api.getProfile);
    this.user = response.data;
    return this.user;
  };

  getSpaceAllocationData = async () => {
    const response = await get(api.getWingAllocation);
    return response.data;
  };
}

export default Store;
