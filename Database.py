
from pymongo import MongoClient
import Encryptor

class DatabaseImpl:
    def __init__(self):
        # Used to access the mongodb Cluster
        client = MongoClient(
            "mongodb+srv://farazrahman:JR64hbaPSXTLxl2V@cluster0.ss0ppqn.mongodb.net/?retryWrites=true&w=majority")
        self.myClient = client
        # The singular database that will hold the collections used in the application
        self.__db = client.Project461L
        passMe = "LGowXavJ2MZhq50RhqVD"
        # An encryptor for encrypting the transactions between this program and the user information collection
        self.__encryptor = Encryptor.Encryption(151, -1)

    '''User Methods: Transactions Encrypted'''

    # Input: userid, password
    # Output: code signalling sucess or failure
    # Purpose: Place a new user in the user collection
    def createUser(self, userid, password):
        # Encrypt the arguments
        encryptedPassword = self.__encryptor.encrypt(password)
        encryptedUserID = self.__encryptor.encrypt(userid)

        # Check if there is a user with the id given in the database
        if (self.__db.UserCollection.find_one({"userid": encryptedUserID}) != None):
            # print("Error: Nonunique user id.")
            return -1
        # Create the new user post/document
        userDoc = {
            "userid": encryptedUserID,
            "encryptedPassword": encryptedPassword
        }

        # Insert the new user post/document into the database
        self.__db.UserCollection.insert_one(userDoc)

        # If the post was sucessfully inserted, then return with no errors
        if (self.__db.UserCollection.find_one({"userid": encryptedUserID}) != None):
            return 0
        else:
            # Otherwise signify there was an error
            # print("Error: user was not successfully put in the database.")
            return -1

    # Input: userid
    # Output: the query associated with the userid, or none if none exists
    # Purpose: Get user information
    def getUser(self, userid):

        encryptedUserID = self.__encryptor.encrypt(userid)
        # Returns a dictionary associated with the encrypted userid if one exists
        query = self.__db.UserCollection.find_one({"userid": encryptedUserID})
        if query != None:
            return query
        else:
            # Return Nothing if no user found
            # print("Error: a user with this id was not found in the database.")
            return None

    # Input: userid, a password to check
    # Output: Singal telling wheter or not user was valid
    # Purpose: Determines
    def validateUser(self, userid, passwordToCheck):
        # Encrypt the user id
        encryptedUserID = self.__encryptor.encrypt(userid)

        # if their is no user with the encrypted id specified, return failed signal
        if (self.__db.UserCollection.find_one({"userid": encryptedUserID}) == None):
            return -1

        # Retrieve the *true* password associated with the userid
        foundUser = self.__db.UserCollection.find_one({"userid": encryptedUserID})
        encryptedPassword = foundUser["encryptedPassword"]
        truePassword = self.__encryptor.decrypt(encryptedPassword)

        # Check if the password matches the one in the database
        if (truePassword != passwordToCheck):
            return -1
        else:
            return 0

    # Input: userid
    # Output: Signal telling Success/failure ( initially not necessary)
    # Purpose: Remove a user document/post from UserCollection
    def removeUser(self, userid):
        encryptedUserid = self.__encryptor.encrypt(userid)
        # Deletes the document if there is one, does nothing otherwise
        self.__db.UserCollection.delete_one({"userid": encryptedUserid})
        return 0

    '''Hardware methods'''

    # Input:   name, capacity
    # Output:  Singal telling whether or not hardware post was successful
    # Purpose: Create a hardwareset entry in the hardware collection
    def createHardwareSet(self, name, capacity):
        # If the hardware set witht this name already exists, return a failure signal
        if (self.__db.HardwareCollection.find_one({"name": name}) != None):
            # print("Error: Nonunique hardware set name.")
            return -1

        # Create new hardware post/document
        hardwareDoc = {"name": name,
                       "capacity": capacity,
                       "availability": capacity
                       }
        # Insert ethe new hardware post/document into the Hardware Collection
        self.__db.HardwareCollection.insert_one(hardwareDoc)
        # If the insertion was successul return a success signal, otherwise a failure signal
        if (self.__db.HardwareCollection.find_one({"name": name}) != None):
            return 0
        else:
            # print("Error: hardware was not successfully put in the database.")
            return -1

    # Input: name
    # Output: Hardware Collection entry associated with 'name' or None if it does not exist
    # Purpose: Retreival of hardwareset data
    def getHardwareSet(self, name):
        query = self.__db.HardwareCollection.find_one({"name": name})
        # If there is an entry in the hardware collection with the specified name return it, otherwise return none
        if query != None:
            return query
        else:
            # print("Error: a hardware set with this name was not found in the database.")
            return None

    # Input: name - name of the hardwarset, qty - amount being requested
    # Output: signal telling the sucess or failure of the operation
    # Purpose: Check out the specified quantity from the hardware set specified by name
    def requestHardware(self, name, qty):
        hardware = self.getHardwareSet(name)
        # If there is no hardware set, signal failure
        if hardware == None:
            return -1
        #  If the user is asking for less than zero, return failure
        if qty < 0:
            print("Invalid. Checkout quantity must be a nonnegative number.")
            return -1
        else:
            # If there is enough availability to service the request, subtract that amount, return success
            if (qty <= hardware["availability"]):
                availability = hardware["availability"]
                values = {"$set": {"availability": availability - qty}}
                self.__db.HardwareCollection.update_one({"name": name}, values)
                return 0
            else:
                # Otherwise, there is not, checkout whatever is left by setting avail to 0, return success
                values = {"$set": {"availability": 0}}
                self.__db.HardwareCollection.update_one({"name": name}, values)
                return 0

    # Input: name - name of the hardwarset, qty - amount being requested
    # Output: signal telling the sucess or failure of the operation
    # Purpose: Check in the specified quantity from the hardware set specified by name
    def returnHardware(self, name, qty):
        hardware = self.getHardwareSet(name)
        # If there is no hardware entry by that name
        if hardware == None:
            return -1
        if (qty < 0):
            print("Invalid. check-in quantity must be a nonnegative number.")
            return -1
        else:
            if (qty <= hardware["capacity"] - hardware["availability"]):
                availability = hardware["availability"]
                values = {"$set": {"availability": availability + qty}}
                self.__db.HardwareCollection.update_one({"name": name}, values)
                return 0
            else:
                values = {"$set": {"availability": hardware["capacity"]}}
                self.__db.HardwareCollection.update_one({"name": name}, values)
                return 0

    # Input: none
    # Output: a full list of every hardware set in the database.
    # Purpose: a method to give everything to the client via flask for dynamic updates.
    def hardwareSetList(self):
        mylist = []

        for hardware in self.__db.HardwareCollection.find():
            mylist.append(hardware)

        return mylist

    # Input: name
    # Output: Signal telling Success/failure ( initially not necessary)
    # Purpose: Remove a hardwareset document/post from HardwareCollection
    def removeHardware(self, name):
        # Deletes the document if there is one, does nothing otherwise
        self.__db.HardwareCollection.delete_one({"name": name})
        return 0

        # input: name of hardwareset, projectid, amount to take, "checkout"/"checkin" as strings to pick operation.

    # output: error code indicating success or failure.
    # purpose: give projects resources or take them away.
    def hardwareToProject(self, hardwareName, projectid, qty, inout):
        hardware = self.getHardwareSet(hardwareName)
        project = self.getProject(projectid)
        if (inout == "checkout"):

            # If there is no hardware set, signal failure
            if (hardware == None) or (project == None):
                return -1
            #  If the user is asking for less than zero, return failure
            if (qty < 0):
                print("Invalid. Checkout quantity must be a nonnegative number.")
                return -1
            else:
                # If there is enough availability to service the request, subtract that amount, return success
                if (qty <= hardware["availability"]):
                    availability = hardware["availability"]
                    currenthardware = project["hardware"]
                    values = {"$set": {"availability": availability - qty}}
                    newhw = {"$set": {"hardware": qty + currenthardware}}
                    self.__db.HardwareCollection.update_one({"name": hardwareName}, values)
                    self.__db.ProjectCollection.update_one({"projectid": projectid}, newhw)
                    return 0
                else:
                    # Otherwise, there is not, checkout whatever is left by setting avail to 0, return success
                    availability = hardware["availability"]
                    currenthardware = project["hardware"]
                    values = {"$set": {"availability": 0}}
                    newhw = {"$set": {"hardware": currenthardware + availability}}
                    self.__db.HardwareCollection.update_one({"name": hardwareName}, values)
                    self.__db.ProjectCollection.update_one({"projectid": projectid}, newhw)
                    return 0
        else:
            if (hardware == None) or (project == None):
                return -1

            availability = hardware["availability"]
            capacity = hardware["capacity"]
            currenthardware = project["hardware"]

            if (qty < 0):
                print("Invalid. check-in quantity must be a nonnegative number.")
                return -1
            else:
                if (qty <= currenthardware):
                    # check if you can return this much safely.
                    if (qty <= capacity - availability):
                        # add qty to availability, subtract qty from currenthardware.
                        values = {"$set": {"availability": availability + qty}}
                        newhw = {"$set": {"hardware": currenthardware - qty}}
                        self.__db.HardwareCollection.update_one({"name": hardwareName}, values)
                        self.__db.ProjectCollection.update_one({"projectid": projectid}, newhw)
                        return 0
                    else:
                        # can't return all of it, so return as much as you can.
                        values = {"$set": {"availability": capacity}}
                        newhw = {"$set": {"hardware": currenthardware - (capacity - availability)}}
                        self.__db.HardwareCollection.update_one({"name": hardwareName}, values)
                        self.__db.ProjectCollection.update_one({"projectid": projectid}, newhw)
                        return 0


                else:
                    # check if you can return this much safely.
                    if (currenthardware <= capacity - availability):
                        # add qty to availability, subtract qty from currenthardware.
                        values = {"$set": {"availability": availability + currenthardware}}
                        newhw = {"$set": {"hardware": 0}}
                        self.__db.HardwareCollection.update_one({"name": hardwareName}, values)
                        self.__db.ProjectCollection.update_one({"projectid": projectid}, newhw)
                        return 0
                    else:
                        # can't return all of it, so return as much as you can.
                        values = {"$set": {"availability": capacity}}
                        newhw = {"$set": {"hardware": currenthardware - (capacity - availability)}}
                        self.__db.HardwareCollection.update_one({"name": hardwareName}, values)
                        self.__db.ProjectCollection.update_one({"projectid": projectid}, newhw)
                        return 0

    '''Project Methods'''

    # Input: name - name of the project, description- a string, projectid -  number to identify the project
    # Output: Singal telling whether the insertion was a success or failure
    # Purpose: Inserts a new project/post into the ProjectCollection
    def createProject(self, name, description, projectid, hwSet1, hwSet2):
        # If there already is a project with this project id, return a failure signal
        if (self.__db.ProjectCollection.find_one({"projectid": projectid}) != None):
            # print("Error: Nonunique Project ID.")
            return -1
        # Otherwise, Create a new project document/post
        projectDoc = {
            "name": name,
            "description": description,
            "projectid": projectid,
            "hwSet1": hwSet1,
            "hwSet2": hwSet2
        }
        # Insert the project document/post
        self.__db.ProjectCollection.insert_one(projectDoc)
        # If successfully added, return a sucess signal; otherwise failure signal
        if (self.__db.ProjectCollection.find_one({"projectid": projectid}) != None):
            return 0
        else:
            # print("Error: project was not successfully put in the database.")
            return -1

    # Input: projectid
    # Output: project document associated with the projectid, None if there is not one
    # Purpose: Getting project documentation/data
    def getProject(self, projectid):
        if (self.__db.ProjectCollection.find_one({"projectid": projectid}) != None):
            query = self.__db.ProjectCollection.find_one({"projectid": projectid})
            return query
        else:
            return None

    # Input: projectid - id of the project
    # Output: Signal telling Success/failure ( initially not necessary)
    # Purpose: Remove a project document/post from ProjectCollection
    def removeProject(self, projectid):
        # Deletes the document if there is one, does nothing otherwise
        self.__db.ProjectCollection.delete_one({"projectid": projectid})
        return 0

    # input: nothing
    # output: a list of every project in the database.
    # purpose: a method in python flask allowing for dynamic updates to the project list.
    def projectList(self):
        mylist = []

        for project in self.__db.ProjectCollection.find():
            mylist.append(project)

        return mylist

    '''Other Methods'''

    # Input: None
    # Output: None
    # Purpose: Close the cluster/connection to mongodb
    def closeClient(self):
        self.myClient.close()





