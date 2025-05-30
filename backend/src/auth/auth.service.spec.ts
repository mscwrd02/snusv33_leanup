import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import { Platform } from '../entities/common/Platform';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

// Mock TypeORM repository
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

const mockGoogleProfileNoEmail = {
  id: 'google123',
  displayName: 'Test User',
  // emails: [{ value: 'test@example.com' }], // Email missing
  photos: [{ value: 'http://example.com/profile.jpg' }],
  provider: 'google',
  name: { givenName: 'Test', familyName: 'User' },
};

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: MockRepository<Users>;

  const mockGoogleProfile = {
    id: 'google123',
    emails: [{ value: 'test@example.com' }],
    displayName: 'Test User',
    photos: [{ value: 'http://example.com/profile.jpg' }],
    provider: 'google',
    name: { givenName: 'Test', familyName: 'User' },
  };

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    nickname: 'Test User',
    googleId: 'google123',
    platform: Platform.GOOGLE,
    profileImage: 'http://example.com/profile.jpg',
    password: null, // Or some hashed password if your entity requires it
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    Plans: [],
    CategoryResponses: [],
    SpotResponses: [],
    ParticipatedPlans: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: createMockRepository<Users>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<MockRepository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('googleLogin', () => {
    it('Scenario 1: should return existing user if found by googleId', async () => {
      usersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.googleLogin(mockGoogleProfile);

      expect(result).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { googleId: 'google123' } });
      expect(usersRepository.save).not.toHaveBeenCalled();
      expect(usersRepository.create).not.toHaveBeenCalled();
    });

    it('Scenario 2: should update existing user with googleId if found by email', async () => {
      const existingUserNoGoogleId = { ...mockUser, googleId: null, platform: Platform.OWN };
      usersRepository.findOne
        .mockResolvedValueOnce(null) // First call for googleId
        .mockResolvedValueOnce(existingUserNoGoogleId); // Second call for email
      usersRepository.save.mockResolvedValue({ ...existingUserNoGoogleId, googleId: 'google123', platform: Platform.GOOGLE });

      const result = await service.googleLogin(mockGoogleProfile);

      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { googleId: 'google123' } });
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(usersRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        id: mockUser.id,
        email: 'test@example.com',
        googleId: 'google123',
        platform: Platform.GOOGLE, // Check if platform is updated
        nickname: mockGoogleProfile.displayName, // Check if nickname is updated
        profileImage: mockGoogleProfile.photos[0].value, // Check if profile image is updated
      }));
      expect(result.googleId).toEqual('google123');
      expect(result.platform).toEqual(Platform.GOOGLE);
    });

    it('Scenario 3: should create a new user if not found by googleId or email', async () => {
      usersRepository.findOne.mockResolvedValue(null); // For both googleId and email lookups
      const newUser = { 
        ...mockUser, 
        id: undefined, // id is generated on save
        createdAt: undefined, 
        updatedAt: undefined,
      };
      usersRepository.create.mockReturnValue(newUser); // mock create to return the new user object without id
      usersRepository.save.mockResolvedValue({ ...newUser, id: 2, createdAt: new Date(), updatedAt: new Date() }); // mock save to return user with id

      const result = await service.googleLogin(mockGoogleProfile);

      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { googleId: 'google123' } });
      expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(usersRepository.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        nickname: 'Test User',
        googleId: 'google123',
        profileImage: 'http://example.com/profile.jpg',
        platform: Platform.GOOGLE,
      });
      expect(usersRepository.save).toHaveBeenCalledWith(newUser);
      expect(result.email).toEqual('test@example.com');
      expect(result.googleId).toEqual('google123');
      expect(result.platform).toEqual(Platform.GOOGLE);
      expect(result.id).toBeDefined();
    });
    
    it('Scenario 4: should throw BadRequestException if email is not provided by Google', async () => {
      const profileWithoutEmail = { ...mockGoogleProfile, emails: [] };
      await expect(service.googleLogin(profileWithoutEmail)).rejects.toThrow(
        new Error('Email not provided by Google'), // AuthService throws a generic Error
      );

      const profileWithNullEmail = { ...mockGoogleProfile, emails: [{ value: null }] };
      await expect(service.googleLogin(profileWithNullEmail)).rejects.toThrow(
        new Error('Email not provided by Google'),
      );
    });
    
    it('should throw Error if profile is null', async () => {
        await expect(service.googleLogin(null)).rejects.toThrow(
            new Error('No profile from google'),
        );
    });

    it('should use displayName as nickname if available', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      const expectedNickname = mockGoogleProfile.displayName;
      usersRepository.create.mockImplementation(user => user);
      usersRepository.save.mockImplementation(user => Promise.resolve({ ...user, id: 3 }));
      
      await service.googleLogin(mockGoogleProfile);
      expect(usersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ nickname: expectedNickname })
      );
    });

    it('should construct nickname from givenName and familyName if displayName is not available', async () => {
      const profileNoDisplayName = { ...mockGoogleProfile, displayName: null };
      usersRepository.findOne.mockResolvedValue(null);
      const expectedNickname = `${mockGoogleProfile.name.givenName} ${mockGoogleProfile.name.familyName}`;
      usersRepository.create.mockImplementation(user => user);
      usersRepository.save.mockImplementation(user => Promise.resolve({ ...user, id: 4 }));

      await service.googleLogin(profileNoDisplayName);
      expect(usersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ nickname: expectedNickname })
      );
    });

    it('should use "Google User" as nickname if displayName and name are not available', async () => {
      const profileNoDisplayNameOrName = { ...mockGoogleProfile, displayName: null, name: null };
      usersRepository.findOne.mockResolvedValue(null);
      const expectedNickname = 'Google User';
      usersRepository.create.mockImplementation(user => user);
      usersRepository.save.mockImplementation(user => Promise.resolve({ ...user, id: 5 }));
      
      await service.googleLogin(profileNoDisplayNameOrName);
      expect(usersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ nickname: expectedNickname })
      );
    });

    it('should use profile photo if available', async () => {
        usersRepository.findOne.mockResolvedValue(null);
        const expectedProfileImage = mockGoogleProfile.photos[0].value;
        usersRepository.create.mockImplementation(user => user);
        usersRepository.save.mockImplementation(user => Promise.resolve({ ...user, id: 6 }));

        await service.googleLogin(mockGoogleProfile);
        expect(usersRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({ profileImage: expectedProfileImage })
        );
    });

    it('should set profileImage to null if not in profile', async () => {
        const profileNoPhoto = { ...mockGoogleProfile, photos: [] };
        usersRepository.findOne.mockResolvedValue(null);
        usersRepository.create.mockImplementation(user => user);
        usersRepository.save.mockImplementation(user => Promise.resolve({ ...user, id: 7 }));

        await service.googleLogin(profileNoPhoto);
        expect(usersRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({ profileImage: null })
        );
        
        const profileNullPhoto = { ...mockGoogleProfile, photos: null };
        await service.googleLogin(profileNullPhoto);
        expect(usersRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({ profileImage: null })
        );
    });

  });
});
