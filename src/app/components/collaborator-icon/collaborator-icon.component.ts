import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { CollaboratorsComponent } from '../collaborators/collaborators.component';

@Component({
  selector: 'app-collaborator-icon',
  templateUrl: './collaborator-icon.component.html',
  styleUrls: ['./collaborator-icon.component.scss']
})
export class CollaboratorIconComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Input() note;


  openAddDialog(){

    this.dialog.open(CollaboratorsComponent, 
      {
        data: this.note,
        width: '550px'
      });
  }

  ngOnInit() {
  }

  
}
