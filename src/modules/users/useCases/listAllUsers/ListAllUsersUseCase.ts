import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkIfUserIsAdmin = this.usersRepository.findById(user_id);

    if (!checkIfUserIsAdmin) {
      throw new Error("User not exist in database!");
    }

    if (!checkIfUserIsAdmin.admin) {
      throw new Error("User isn't admin!");
    }

    const allUsers = this.usersRepository.list();

    return allUsers;
  }
}

export { ListAllUsersUseCase };
