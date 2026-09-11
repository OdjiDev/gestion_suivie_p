package com.odji.spring_back_end.controller;

import com.odji.spring_back_end.dto.AffectationDto;
import com.odji.spring_back_end.dto.AffectationDto;
import com.odji.spring_back_end.dto.AffectationDto;
import com.odji.spring_back_end.exeption.ResourceNotFoundException;
import com.odji.spring_back_end.model.*;
import com.odji.spring_back_end.model.Affectation;
import com.odji.spring_back_end.model.Affectation;
import com.odji.spring_back_end.repository.*;
import com.odji.spring_back_end.repository.AffectationRepository;
import com.odji.spring_back_end.services.AffectationService;


import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AffectationController {

    private final AffectationService affectationService;

    private final AffectationRepository affectationRepository;
       private final ProduitRepository produitRepository;
    private  final PersonelRepository personelRepository;
    private  final BureauRepository bureauRepository;


     //create affectation
    @PostMapping("/affectations")
    public ResponseEntity<AffectationDto> createAffectation(@RequestBody AffectationDto affectationDto) {
        Affectation affectation = affectationService.dtoToAffectation(affectationDto);
        Affectation savedAffectation= affectationRepository.save(affectation);
        return ResponseEntity.ok(affectationService.affectationToDto(savedAffectation));
    }

    // create affectation
//    @PostMapping("/affectations")
//    public AffectationDto createAffectation(@RequestBody AffectationDto affectationDto) {
//        Affectation affectation= affectationService.dtoToAffectation(affectationDto);
////         Integer personelId= affectationDto.getPersonelDto().getId();
////         Optional<Personel> existingPersonelOptional= personelRepository.findById(personelId);
////
////       // Verification de l'existance du personel
////        if(existingPersonelOptional.isPresent()){
////            // Si personel est trouvé l'affecter  au affectation
////           affectation.setPersonel(existingPersonelOptional.get());
//////        }
//
//        Integer produitId= affectationDto.getProduitDto().getId();
//        Optional<Produit> existingProduitOptional= produitRepository.findById(produitId);
//
//        //Verification de l'existance de la produit
//        if(existingProduitOptional.isPresent()){
//            // Si  la produit est trouvé l'affecter  au affectation
//            affectation.setProduit(existingProduitOptional.get());
//        }
//        Integer bureauId= affectationDto.getBureauDto().getId();
//        Optional<Bureau> existingBureauOptional= bureauRepository.findById(bureauId);
//
//        //Verification de l'existance du bureau
//        if(existingBureauOptional.isPresent()){
//            // Si  la bureau est trouvé l'affecter  au affectation
//            affectation.setBureau(existingBureauOptional.get());
//        }
//
//        // enrégistrement du affectation dans la base de donnée
//        affectationDto= affectationService.affectationToDto(affectationRepository.save(affectation));
//        return affectationDto;
//    }
    
    // get all Affectation
    @GetMapping("/affectations/list")
    public List<AffectationDto> getAllAffectation() {
        List<Affectation> affectations = affectationRepository.findAll(); // Assuming you have a JPA repository named 'affectationRepository'
        return affectationService.affectationsDtoList(affectationRepository.findAll()); // Convert products to DTOs
    }

  

    //get affectation by id
    @GetMapping("affectations/{id}")
    public ResponseEntity<Affectation> getAffectationById(@PathVariable Integer id) {
        Optional<Affectation> optionalAffectation = affectationRepository.findById(id);

        if (optionalAffectation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(optionalAffectation.get());
    }
    // Update a category
    @PutMapping("affectations/update/{id}")
    public ResponseEntity<AffectationDto> updateAffectation(@PathVariable Integer id,@RequestBody AffectationDto affectationDetailsDto) {
        Affectation updateAffectation = affectationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Affectation not exist with id: " + id));
        updateAffectation = affectationService.dtoToAffectation(affectationDetailsDto);
        updateAffectation.setId(id);

        affectationDetailsDto= affectationService.affectationToDto(affectationRepository.save(updateAffectation));

        return ResponseEntity.ok(affectationDetailsDto);
    }
    

    // build delete inscription REST API
    @DeleteMapping("affectations/{id}")
    public ResponseEntity<HttpStatus> deleteAffectation(@PathVariable Integer id){

        Affectation affectation = affectationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("affectation  not exist with id: " + id));

        affectationRepository.delete(affectation);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}




