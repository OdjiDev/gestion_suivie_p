
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MiseajourService } from './miseajour.service';
import { MiseajourDto } from './miseajour-dto';
import { Mise_a_jourService } from '../mise_a_jour.service';
import { Mise_a_jourDto } from './mise_a_jour-dto';


@Component({
  selector: 'app-mise-a-jour',
  templateUrl: './mise-a-jour.component.html',
  styleUrls: ['./mise-a-jour.component.css']
})
export class MiseAJourComponent implements OnInit {
  //miseajours: MiseajourDto[] = [];
  //miseajourDto: MiseajourDto = new MiseajourDto();


  mise_a_jours: Mise_a_jourDto[]=[];
  mise_a_jourDto: Mise_a_jourDto = new Mise_a_jourDto();


  // constructor(private miseajourService:MiseajourService,
  //   private router: Router) { }
    constructor(private mise_a_jourService:Mise_a_jourService,
      private router: Router) { }

    ngOnInit(): void {

// this.getMise_a_joursConsole
      this.getMise_a_joursConsole() ;

    }


   getMise_a_joursConsole() {


    this.mise_a_jourDto.etat='';
      this.mise_a_jourService.getMise_a_jours()
        .subscribe(data => {
          console.log("LE DATA EST");
          console.log(data);
          this.mise_a_jours = data; // Store the data in the 'miseajours' property
          this.mise_a_jourDto.etat += `Toutes les miseajours: ${JSON.stringify(data)}\n`; // Append the formatted output to the variable
        });

      return this.mise_a_jourDto.etat; // Return the accumulated output after the subscription completes
    }




 checkWordInString(word: string, string: string): boolean {
      const lowercaseWord = word.toLowerCase();
      const lowercaseString = string.toLowerCase();
      return lowercaseString.includes(lowercaseWord);
    }

    onSubmit() {
      console.log(this.mise_a_jourDto);  //change
      try {
        // ... (Existing code for calling getMiseajours and handling errors)

        if (this.mise_a_jourDto) { // Assuming miseajourDto is checked for validity elsewhere
          const wordToCheck = "Remplacement" ||"différents";
          const result = this.checkWordInString(wordToCheck, this.mise_a_jourDto.etat);
          this.mise_a_jourDto.result = result; // Update the component's result property

          if (result) {
            alert("une mise à jour est disponible");
            console.log('"mise a jour disponible".');
           // this.router.navigate(['/progressbar']);
            // Optionally, display a message on the HTML page using your framework's methods (e.g., Angular template binding)
          } else {
            alert("Vous êtes deja à jour");
            console.log('"Vous ete deja a jour" ');
          }
        } else {
          console.error("Error fetching miseajours or invalid type:", this.mise_a_jourDto);
        }
      } catch (error) {
        console.error("Error fetching miseajours:", error);
        // Handle the error (e.g., display an error message to the user)
      }
      //this.getMiseajoursConsole() ;
    }


  }









   // miseajourDto.etat=this.getMiseajoursConsole;
    // getMiseajours(): void {
    //   this.miseajourService.getMiseajours()
    //     .subscribe(miseajours  => this.miseajours = miseajours);
    //    // this.miseajourDto = data;
       //  console.log("Toutes les miseajourDto: ", this.miseajours);

 //   }


// saveMiseajour(){
// this.miseajourService.addMiseajour(this.miseajourDto).subscribe( data =>{
//   console.log(data);
//   console.log('Miseajour créé avec succès!');
//   this.goTomiseajourList();
// },
// error => console.log(error));
// }

// goTomiseajourList(){
// this.router.navigate(['admin/listmiseajour']);
// }





// onSubmit(){
// this.getMiseajours();
// console.log(this.miseajourDto);
// this.saveMiseajour();
// const lowercaseTexte = texte.toLowerCase();
// const hasJour = lowercaseTexte.includes("jour");

// const miseajourDto.etat = this.miseajourDto.toLowerCase();
// if (this.miseajourDto.includes('jour')) {
//   console.log('"jour" is present in the miseajours text.');
// } else {
//   console.log('"jour" is not present in the miseajours text.');
// // }
// async onSubmit() {
//   // 1. Obtenir les données de mise à jour (supposons qu'elles renvoient une chaîne)
//   const miseajourDto.etat = await this.getMiseajours();

//   // 2. Convertir en minuscules et vérifier la présence de "jour"
//   if (miseajourDto.etat.toLowerCase().includes('jour')) {
//     console.log('"jour" est présent dans le texte de mise à jour.');
//   } else {
//     console.log('"jour" n\'est pas présent dans le texte de mise à jour.');
//   }
// var text=this.miseajourDto;
//   // 3. Traiter miseajourDto
//   console.log(this.miseajourDto); // En supposant qu'il s'agit déjà d'un objet valide

//   // 4. Enregistrer la mise à jour (en supposant que saveMiseajour() gère les données)
//   this.saveMiseajour();
// }
