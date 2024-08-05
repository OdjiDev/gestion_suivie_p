import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
users: User[] = [];
user: User = new User();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredUsers: User[] = [];
datas: User[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private userService: UserService) {
  this.getAllUsers();
}


delete() {
//   this.userService.deleteUser(this.user.userId).subscribe(
//     (data) => {
//       this.showSuccessMessage('User' + this.user.id + ' supprimé avec succès!!' + data);
//       this.getAllUsers();
//       this.user = new User();
//     }
//   );
 }
deleteUser(user: User) {
  this.user = user;
  //this.delete();
}

ngOnInit() {
  this.getAllUsers();
  this.filteredData();
}

async getAllUsers() {
  await this.userService.getUsers().subscribe(
    (data: User[]) => {
      this.users = data;
      this.datas = data;
      this.totalItems = data.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.filteredData();
    }
  );
}
itemsPerPageChanged() {
  this.currentPage = 1;
  this.filteredData();
  this.getPages();
}

// Ordonner les données en fonction du nom du champ
// tri par ordre alphabétique suit le nom de la colonne
filterByChanged() {
  if (this.filterBy == 'nom') {
    this.datas.sort((a, b) => a.userId.localeCompare(b.userId));
  } else if (this.filterBy == '') {
    this.datas.sort((a, b) => a.User_role.localeCompare(b.User_role));
  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterUserLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe user
  try {
    if (this.searchText) {
      this.datas = await this.users.filter(user => {
        return user.userId.toLowerCase().includes(this.searchText.toLowerCase())
          || user.User_role.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.users;
    }
    this.filteredData();
  } catch (error) {
    console.error(error);
  }
}
// Méthode pour obtenir les numéros de page à afficher dans la pagination
getPages() {
  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.pages = Array(this.totalPages).fill(0).map((_, index) => index + 1);

}

// Méthode pour changer de page
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.filteredData();
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.filteredData();
  }
}
previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.filteredData();
  }
}

async filteredData() {
  let startPage = (this.currentPage - 1) * this.itemsPerPage;
  let endPage = startPage + this.itemsPerPage;
  this.filteredUsers = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('Users.pdf');
    }
  });
}

showSuccessMessage(message: string) {
  this.message = message;
  this.style = "alert alert-danger";
  setTimeout(() => {
    this.message = '';
  }, 5000);
}
}













