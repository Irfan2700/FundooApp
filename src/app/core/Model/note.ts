import { Deserializable } from './deserializable';
// import { Deserializable }

// export interface Note {
//     title: string
//     description: string
//     color: string
//     createdDate: Date
//     modifiedDate: Date
//     id: string
//     imageUrl: string
//     isArchived: boolean
//     isDeleted: boolean
//     isPined: boolean
//     reminder: [Date]
//     noteLabels: Array<Label>
//     userId: string
//     labelIdList: [string]
//     noteCheckLists: Array<Checklists>
//     questionAndAnswerNotes: [object]
//     collaborators: [object]
// }
// export interface Label {
//     id: string
//     label: string
//     isDeleted: boolean
//     userId: string

// }
// export interface Checklists {
//     createdDate: Date
//     id: string
//     isDeleted: boolean
//     itemName: string
//     modifiedDate: Date
//     notesId: string
//     status: string
// }

export class Notes implements Deserializable {
    

    public title: string
    public description: string
    public color: string
    public createdDate: Date
    public modifiedDate: Date
    public id: string
    public imageUrl: string
    public isArchived: boolean
    public isDeleted: boolean
    public isPined: boolean
    public reminder: [Date]
    public noteLabels: Array<Labels>
    public userId: string
    public labelIdList: [string]
    public noteCheckLists: Array<CheckList>
    public questionAndAnswerNotes: [object]
    public collaborators: [object]
    public user: Array<any>

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }

    // constructor(title, description, color, createdDate, modifiedDate, id, imageUrl,
    //      isArchived, isDeleted, isPined, reminder, noteLabels, userId, labelIdList,
    //       noteCheckLists, questionAndAnswerNotes, collaborators, user){

    //         this.title = title;
    //         this.description = description;
    //         this.color = color;
    //         this.createdDate = createdDate;
    //         this.modifiedDate = modifiedDate;
    //         this.id = id;
    //         this.imageUrl = imageUrl;
    //         this.isArchived = isArchived;
    //         this.isDeleted = isDeleted;
    //         this.isPined = isPined;
    //         this.reminder = reminder;
    //         this.noteLabels = noteLabels;
    //         this.userId = userId;
    //         this.labelIdList = labelIdList;
    //         this.noteCheckLists = noteCheckLists;
    //         this.questionAndAnswerNotes = questionAndAnswerNotes;
    //         this.collaborators = collaborators;
    //         this.user = user;
    // }

    // constructor(input: any){
    //     Object.assign(this, input);
    //     return this;

    // }
}

export class Labels implements Deserializable {

    public id: string
    public label: string
    public isDeleted: boolean
    public userId: string

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}

export class CheckList {

    public createdDate: Date;
    public id: string;
    public isDeleted: boolean;
    public itemName: string;
    public modifiedDate: Date;
    public notesId: string;
    public status: string;

    constructor(id, createdDate, modifiedDate, notesId, isDeleted, itemName, status){

        this.id = id;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.notesId = notesId;
        this.isDeleted = isDeleted;
        this.itemName = itemName;
        this.status = status;
    }
}

// export interface Deserializable {
//     deserialize(input: any): this;
//   }