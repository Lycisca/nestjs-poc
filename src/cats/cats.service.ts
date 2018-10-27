export class CatsService {
  constructor(private usersRepository) {}
  index() {
    return this.usersRepository.findAll();
  }
  show() {
    return this.usersRepository.findById();
  }
}
