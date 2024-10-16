import { User } from "../types/User";

class UserApi {
    private key:string ; 
    constructor() {
        this.key = 'loggedUser'
        this.mockUser(); 
    }

      // Metoda mockująca dane zalogowanego użytkownika i zapisująca je w localStorage
  private mockUser(): void {
    const user: User = {
      id: '1',           // Stałe ID użytkownika dla mocka
      firstName: 'John',  // Mockowane imię
      lastName: 'Doe',    // Mockowane nazwisko
    };

    if(!localStorage.getItem(this.key)) {
        localStorage.setItem(this.key, JSON.stringify(user)); 
    }
  } 
  getLoggedUser() : User | null {
    const user = localStorage.getItem(this.key); 
    return user ? JSON.parse(user) : null ; 
  }
  logoutUser(): void {
    localStorage.removeItem(this.key); 
  }
}
export default new UserApi() ; 