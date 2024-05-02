export class Departament{

  DEPT_CODI?: number;
  DEPT_NOM?: string
  DEPT_UBICACIO?: string
  DEPT_TELEFON?: string;
  DEPT_PROF_DNI?: string;


  constructor(DEPT_CODI: number, DEPT_NOM: string, DEPT_UBICACIO: string, DEPT_TELEFON: string, DEPT_PROF_DNI: string) {
    this.DEPT_CODI = DEPT_CODI;
    this.DEPT_NOM = DEPT_NOM;
    this.DEPT_UBICACIO = DEPT_UBICACIO;
    this.DEPT_TELEFON = DEPT_TELEFON;
    this.DEPT_PROF_DNI = DEPT_PROF_DNI;
  }
}
