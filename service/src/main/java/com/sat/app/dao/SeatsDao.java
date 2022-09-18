package com.cs.sat.dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

@Component
public class SeatsDao {

	public String getAllSeats() {
		Resource resource = new ClassPathResource("building.json");
		InputStream inputStream;
		byte[] fileData = null;
		try {
			inputStream = resource.getInputStream();
			fileData = FileCopyUtils.copyToByteArray(inputStream);

		} catch (IOException e) { // TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String outputString = new String(fileData);
		System.out.println(outputString);
		return outputString;
	}

	public void updateAllocations(String json) {
		Path path = Paths.get("/Users/rohitnaikkundaikar/Desktop/CS/mvps-cs-hackathon/public/building.json");
		try {
			byte[] strToBytes = json.getBytes();
			Files.write(path, strToBytes);
		} catch (Exception ex) {
			System.out.print("Invalid Path");
		}
	}

	public String getAllocations() {
		File file = new File("/Users/rohitnaikkundaikar/Desktop/CS/mvps-cs-hackathon/public/building.json");
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return br.lines().collect(Collectors.joining());
	}
}
