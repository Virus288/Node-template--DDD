import type { IGetUserDto } from './types.js';
import type { IUserEntity } from '../../../domain/user/types.js';
import type GetUserDto from '../../../presentation/controllers/user/schemas/get/dto.js';
import type { IUseCase } from '../../../types/index.js';
import type { IUserRepository } from '../repository.js';

export default class GetUserUseCase implements IUseCase<IGetUserDto, IUserEntity | null> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  private get userRepository(): IUserRepository {
    return this._userRepository;
  }

  async execute(input: GetUserDto): Promise<IUserEntity | null> {
    return this.userRepository.get(input.id);
  }
}
