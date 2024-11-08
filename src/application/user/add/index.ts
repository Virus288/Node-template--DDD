import User from '../../../domain/user/index.js';
import type { IAddUserDto } from './types.js';
import type AddUserDto from '../../../presentation/controllers/user/schemas/add/dto.js';
import type { IUseCase } from '../../../types/index.js';
import type { IUserRepository } from '../repository.js';

export default class AddUserUseCase implements IUseCase<IAddUserDto, void> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(input: AddUserDto): Promise<void> {
    const user = new User(input);

    await this.userRepository.add(user);
  }
}
