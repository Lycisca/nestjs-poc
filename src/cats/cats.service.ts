export class CatsService {
  constructor(private usersRepository) {}
  index() {
    return this.usersRepository.findAll();
  }
}
