package com.sat.app.services;

import org.springframework.stereotype.Component;

import com.sat.app.dao.SeatsDao;

@Component
public class SeatAllocationServiceImpl implements SeatAllocationServiceInterface {

	@Override
	public String getSeats() {
		SeatsDao dao = new SeatsDao();
		return dao.getAllocations();
	}

	@Override
	public void updateAllocations(String json) {
		SeatsDao dao = new SeatsDao();
		dao.updateAllocations(json);
		
	}

}
