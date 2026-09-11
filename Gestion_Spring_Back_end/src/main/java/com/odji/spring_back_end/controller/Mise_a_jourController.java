package com.odji.spring_back_end.controller;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.yaml.snakeyaml.constructor.Construct;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200/") // Enable CORS for frontend at port 4200
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/serveur")
public class Mise_a_jourController {



    public static String translatePath(String windowsPath) {
        if (windowsPath == null) {
            return null;
        }
        return windowsPath.replace("\\", "/");
    }



    @GetMapping("/miseajours/execute")
    public ResponseEntity<String> executeScript() throws JsonProcessingException {
        String output;
        int exitCode;



         //Get the current working directory
    String currentDir = System.getProperty("user.dir");
    // Construct the script path using the current working directory
   String scriptPath = currentDir + "\\mise_a_jour.sh";


        String unixPath = translatePath(scriptPath);
        System.out.println(unixPath);


        try {
            // Execute the script using ProcessBuilder with Git Bash
           //List<String> command = List.of("cmd", "/c", "Z:\\logiciel_MAJ\\Git\\bin\\bash.exe", "-c",SCRIPT_PATH);
           List<String> command = List.of("cmd", "/c", "bash", "-c", unixPath);
            //ProcessBuilder processBuilder = new ProcessBuilder("cmd", "/c", unixPath);
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            InputStream inputStream = process.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder outputBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                outputBuilder.append(line).append("\n");
            }
            reader.close();
            process.waitFor();
            exitCode = process.exitValue();

            if (exitCode != 0) {
                throw new RuntimeException("Script exited with error code: " + exitCode);
            }

            output = outputBuilder.toString();
        } catch (IOException | InterruptedException | RuntimeException e) {
            output = "Error executing script: " + e.getMessage();
            exitCode = -1;
        }

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("output", output);
        responseMap.put("exitCode", exitCode);

        return ResponseEntity.status(exitCode == 0 ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(new ObjectMapper().writeValueAsString(responseMap));
    }
}













//package com.odji.spring_back_end.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@CrossOrigin(origins ="http://localhost:4200/") // Enable CORS for frontend at port 4200
//@RestController
//@RequestMapping("/api/serveur")
//
//public class Mise_a_jourController {
//
//    private static final String SCRIPT_PATH = "Z:/logiciel_MAJ/MAJ/gestion_suivie_p/Gestion_Spring_Back_end/mise_a_jour.sh"; // Hardcoded script path
//
//    @GetMapping("/miseajours/execute")
//    public ResponseEntity<String> executeScript() throws JsonProcessingException {
//        String output;
//        int exitCode;
//
//        try {
//            //essaie de mise a jour
//            // Exécuter le script en utilisant ProcessBuilder avec Git Bash
//            List<String> command = List.of("cmd", "/c", "C:\\Program Files\\Git\\bin\\bash.exe", "-c", SCRIPT_PATH);
//            // Ajuster le chemin d'accès à l'installation de Git Bash si nécessaire
//            ProcessBuilder processBuilder = new ProcessBuilder(command);
//            Process process = processBuilder.start();
//
//            InputStream inputStream = process.getInputStream();
//            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
//            StringBuilder outputBuilder = new StringBuilder();
//            String line;
//            while ((line = reader.readLine()) != null) {
//                outputBuilder.append(line).append("\n");
//            }
//            reader.close();
//            process.waitFor();
//            exitCode = process.exitValue();
//
//            if (exitCode != 0) {
//                throw new RuntimeException("Script exited with error code: " + exitCode);
//            }
//
//            output = outputBuilder.toString();
//        } catch (IOException | InterruptedException | RuntimeException e) {
//            output = "Error executing script: " + e.getMessage();
//            exitCode = -1;
//        }
//
//        Map<String, Object> responseMap = new HashMap<>();
//        responseMap.put("output", output);
//        responseMap.put("exitCode", exitCode);
//
//
//        return ResponseEntity.status(exitCode == 0 ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
//                .body(new ObjectMapper().writeValueAsString(responseMap));
//    }
//}



