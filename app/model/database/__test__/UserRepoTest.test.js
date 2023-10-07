import { UserRepo } from '../UserRepo';

describe('UserRepo', () => {
    let userRepo;
    let mockDatabase;
  
    beforeEach(() => {
      // Create a mock DatabaseAdapter
      mockDatabase = {
        runSqlStmt: jest.fn(() => Promise.resolve('')),
      };
  
      // Create a new UserRepo instance with the mock DatabaseAdapter
      userRepo = new UserRepo(mockDatabase);
    });

    describe('createUser', () => {
        it('should create a user and return their ID', async () => {

            const mockResult = {
                insertId: 123
            }

            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);

            const userId = await userRepo.createUser(
                'testUser',
                'John',
                'Doe',
                30,
                70,
                'test@example.com',
                'password123'
            );

            expect(userId).toBe(123);
        });
    });

    describe('getUserByUserName', () => {
        it('should get user by the username provided', async () => {
    
            const mockResult = {
                rows: {
                    length: 1,
                    item: () => ({
                        uid: 123,
                        username: 'testUser',
                        fName: 'John',
                        sName: 'Doe',
                        age: 30,
                        weight: 70,
                        email: 'test@example.com',
                        password: 'password123',
                    }),
                    
                },
            };
    
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
    
            const user = await userRepo.getUserByUsername('testUser');
    
            expect(user).toEqual(mockResult.rows.item(0));
        });
        
        it('rejects with error if user not found', async () => {
            const mockResult = {
                rows: {
                    length: 0,
                },
            };
      
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      
            await expect(userRepo.getUserByUsername('nonExistentUser')).rejects.toThrowError(
                'No user with username: nonExistentUser'
            );
        });

        it('rejects with error if user data is incomplete', async () => {
      
            const mockResult = {
                rows: {
                    length: 1,
                    item: () => ({
                        uid: 123,
                        username: 'testUser',
                        age: 30,
                        email: 'test@example.com'
                    }),
                },
            };
      
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      
            await expect(userRepo.getUserByUsername('testUser')).rejects.toThrowError(
                'User table does not contain all Patient class attributes'
            );
        });
    });

    describe('getUserByUserId', () => {
        it('should get user by the id provided', async () => {
    
            const mockResult = {
                rows: {
                    length: 1,
                    item: () => ({
                        uid: 123,
                        username: 'testUser',
                        fName: 'John',
                        sName: 'Doe',
                        age: 30,
                        weight: 70,
                        email: 'test@example.com',
                        password: 'password123',
                    }),
                    
                },
            };
    
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
    
            const user = await userRepo.getUserByID(123);
    
            expect(user).toEqual(mockResult.rows.item(0));
        });
        
        it('rejects with error if user not found', async () => {
            const mockResult = {
                rows: {
                    length: 0,
                },
            };
      
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      
            await expect(userRepo.getUserByID(100)).rejects.toThrowError(
                'No user with uid: 100'
            );
        });

        it('rejects with error if user data is incomplete', async () => {
      
            const mockResult = {
                rows: {
                    length: 1,
                    item: () => ({
                        uid: 123,
                        username: 'testUser',
                        age: 30,
                        email: 'test@example.com'
                    }),
                },
            };
      
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      
            await expect(userRepo.getUserByID(123)).rejects.toThrowError(
                'User table does not contain all user class attributes'
            );
        });
    });

    describe('getAllUsers', () => {
        it('get every users stored in rows', async() => {
            const mockResult = {
                rows: {
                    _array: [{
                        uid: 1,
                        username: 'user1',
                        fName: 'John',
                        sName: 'Doe',
                        age: 30,
                        weight: 70,
                        email: 'user1@example.com',
                        password: 'password1',
                    },
                    {
                        uid: 2,
                        username: 'user2',
                        fName: 'Jane',
                        sName: 'Smith',
                        age: 25,
                        weight: 60,
                        email: 'user2@example.com',
                        password: 'password2',
                    }],
                }
            };
            
            mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);

            const users = await userRepo.getAllUsers();

            expect(users).toEqual(mockResult.rows._array);
        });
    });

});
