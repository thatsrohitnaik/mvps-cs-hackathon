package com.sat.app.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.sat.app.services.SeatAllocationServiceInterface;



@RestController
@RequestMapping("/api/v1")
public class SeatsController {
	
	@Autowired
	SeatAllocationServiceInterface seatAllocationService;
	
	@GetMapping("/allocations")
    public String getAllocations() {
              
       return seatAllocationService.getSeats();
    }
	
	
	@PostMapping("/allocations")
    public void updateAllocations(@RequestBody String json) {
		seatAllocationService.updateAllocations(json);
    }
}
