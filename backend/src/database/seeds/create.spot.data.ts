import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Spots } from '../../entities/Spots';
import { Region } from '../../entities/common/Region';
export default class SpotSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const spotsRepository = dataSource.getRepository(Spots);

    await spotsRepository.insert([
      {
        name: '새별오름',
        address: '제주특별자치도 제주시 애월읍 봉성리 산 59-8',
        overview: '광진이 화이팅!!',
        reviews: 10,
        region: Region.EAST,
      },
      {
        name: '쇠소깍',
        address: '제주특별자치도 서귀포시 쇠소깍로 104',
        overview: '광진이가 산책하기 좋은 곳',
        reviews: 20,
        region: Region.EAST,
      },
      {
        name: '헬로키티아일랜드',
        address: '제주특별자치도 서귀포시 안덕면 한창로 340',
        overview: '광진이 헬로키티 귀요미 >_<',
        reviews: 30,
        region: Region.EAST,
      },
      {
        name: '오설록 티뮤지엄',
        address: '제주특별자치도 서귀포시 안덕면 신화역사로 15',
        overview: '광진이가 마시는 티는 캐모마일',
        reviews: 40,
        region: Region.EAST,
      },
      {
        name: '금능해수욕장',
        address: '제주특별자치도 제주시 한림읍 금능길 119-10',
        overview: '광진이 수영 못 함 ㅋㅋㅋ',
        reviews: 50,
        region: Region.EAST,
      },
    ]);
  }
}
