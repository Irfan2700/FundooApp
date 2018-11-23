import { ServicesService } from 'src/app/core/services/services.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteServicesService {

  constructor(private httpService: ServicesService) { }

  addNotes(body){
    return this.httpService.httpPostEncoded("notes/addNotes", body)
  }

  getNotesList(){
    return this.httpService.httpGetJson("notes/getNotesList");
  }

  updateNotesCheckList(noteId, checkListId, body){
    return this.httpService.httpPostJson("notes/" + noteId + "/checklist/" + checkListId + "/update", body);
  }

  updateNotes(body){
    return this.httpService.httpPostEncoded("notes/updateNotes",body);
  }

  updateExtendedNoteChecklist(noteId,body){
    return this.httpService.httpPostJson("notes/" + noteId + "/checklist/add", body)
  }

  removeNotesCheckList(noteId, checkListId, body){
    return this.httpService.httpPostJson("notes/" + noteId + "/checklist/" + checkListId + "/remove", body)
  }

  getNoteLabelList(){
    return this.httpService.httpGetJson("noteLabels/getNoteLabelList");
  }

  archiveNote(body){
    return this.httpService.httpPostJson("notes/archiveNotes", body);
  }

  createLabel(body){
    return this.httpService.httpPostJson("noteLabels",body);
  }

  deleteLabel(labelId){
    return this.httpService.httpDeleteJson("noteLabels/" + labelId + "/deleteNoteLabel");
  }
  
  updateLabelName(labelId, body){
    return this.httpService.httpPostJson("noteLabels/"+labelId+"/updateNoteLabel", body);
  }

  getNoteArchiveList(){
    return this.httpService.httpGetJson("notes/getArchiveNotesList");
  }

  getNoteListByLabel(labelName){
    return this.httpService.httpPostJson("notes/getNotesListByLabel/" + labelName, null);
  }

  trashNotes(body){
    return this.httpService.httpPostJson("notes/trashNotes", body);
  }

  addLabelToNotes(noteId, labelId){
    return this.httpService.httpPostJson("notes/"+noteId+"/addLabelToNotes/"+labelId+"/add", null)
  }

  removeLabelFromNotes(noteId, labelId){
    return this.httpService.httpPostJson("notes/"+noteId+"/addLabelToNotes/"+labelId+"/remove",null)
  }

  changeNoteColor(body){
    return this.httpService.httpPostJson("notes/changesColorNotes", body);
  }

  getTrashNoteList(){
    return this.httpService.httpGetJson("notes/getTrashNotesList");
  }

  deleteNoteForever(body){
    return this.httpService.httpPostJson("notes/deleteForeverNotes", body);
  }

  addRemainder(body){
    return this.httpService.httpPostJson("notes/addUpdateReminderNotes", body)
  }

  deleteRemainder(body){
    return this.httpService.httpPostJson("notes/removeReminderNotes", body);
  }

  getReminderList(){
    return this.httpService.httpGetJson("notes/getReminderNotesList");
  }

  pinUnpinNotes(body){
    return this.httpService.httpPostJson("notes/pinUnpinNotes", body);
  }

  addCollaborator(body, noteId){
    return this.httpService.httpPostJson("notes/"+noteId+"/AddcollaboratorsNotes", body);
  }

  // deleteCollaborator(){
  //   return this.httpService.ht
  // }
}
