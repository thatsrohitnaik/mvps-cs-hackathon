package com.cs.sat.controller;

import com.cs.sat.service.SeatAllocationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
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
