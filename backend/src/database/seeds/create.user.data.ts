import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Users } from '../../entities/Users';
import bcrypt from 'bcrypt';
export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const usersRepository = dataSource.getRepository(Users);
    const aPW = await bcrypt.hash('a', 12);
    const bPW = await bcrypt.hash('b', 12);
    await usersRepository.insert([
      {
        email: 'a@a.com',
        nickname: 'a',
        password: aPW,
      },
      {
        email: 'b@b.com',
        nickname: 'b',
        password: bPW,
      },
    ]);
  }
}
