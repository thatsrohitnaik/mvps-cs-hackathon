package com.sat.app.dao;

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

@Component
public class SeatsDao {

	public String getAllSeats() {
		Resource resource = new ClassPathResource("seats.json");
		InputStream inputStream;
		byte[] fileData = null;
		try {
			inputStream = resource.getInputStream();
			fileData = FileCopyUtils.copyToByteArray(inputStream);

		} catch (IOException e) { 
			e.printStackTrace();
		}

		String outputString = new String(fileData);
		System.out.println(outputString);
		return outputString;
	}

	public void updateAllocations(String json) {
		Path path = Paths.get("E:\\Seats\\seats.json");

		try {

			Files.writeString(path, json, StandardCharsets.UTF_8);
		} catch (Exception ex) {
			System.out.print("Invalid Path");
		}
	}

	public String getAllocations() {
		 File file = new File("E:\\Seats\\seats.json");
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return br.lines().collect(Collectors.joining());
	}

}