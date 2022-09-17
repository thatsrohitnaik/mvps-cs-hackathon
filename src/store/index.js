import { makeAutoObservable } from 'mobx';
import { axios } from 'axios';

class Store {
  loading = false;
  profile = { info: Object, posts: Object };
  continents = {};
  countries = {};

  constructor() {
    makeAutoObservable(this);
  }

  getProfile = async () => {
    const response = await axios.get('db.json');
    this.profile = response.data.profile;
    this.loading = true;
    console.log(this.loading);
  };
}

export default Store;
