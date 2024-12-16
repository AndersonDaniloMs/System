export class Administrador {
  private username?: string | any;
  private email?: string | any;
  private senha?: string | any;

  constructor() {}

  getUsername(): string {
    return  this.username;
  }
  getEmail(): string {
    return this.email;
  }
  getSenha(): string {
    return this.senha;
  }
  setUsername(username: string) {
    this.username = username;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setSenha(senha: string) {
    this.senha = senha;
  }
  toString(): string {
    return (
      "Username: " +
      this.username +
      "\nEmail: " +
      this.email +
      "\nSenha: " +
      this.senha
    );
  }
}
