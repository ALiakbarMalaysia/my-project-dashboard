export interface UploaderConfig {
    documentTypeId: string;
    downloadable?: boolean;
    multiple?: boolean;
    files?: DocumentViewDTO[];
    enableActions?: boolean;
  }
  
  export interface DocumentViewDTO {
    id: string;
    typeId: string;
    type: DocumentTypeDTO;
    fileName: string;
    fileContent: string;
  }
  
  export interface DocumentTypeDTO {
    id: string;
    name: string;
    code: string;
    fileLimitations: FileLimitation[];
  }
  
  export interface FileLimitation {
    extension: string;
    maxSizeInByte: number;
  }
  
  export interface ICategories {
    id: number;
    brand: string;
  }
  
  export interface IUploadIMG{
    filename:string;
    message:string;
  }