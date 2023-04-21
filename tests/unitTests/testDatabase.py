import unittest
import Database

# insert here the import statements for the class and module containing the code you want to test
# from mymodule import MyClass

class TestMyClass(unittest.TestCase):
  
    @classmethod
    def setUpClass(cls):
        # Initialize necessary objects or states before the tests are run
        pass

    def setUp(self):
        # Initialize necessary objects or states before every test
        pass

    def test_createUser(self):
        self.assertEqual(createUser(self, "user123", "pass123"), 0)

    def test_getUser(self):
        self.assertIsNone(getUser(self, "nonexist123"))

    def test_validateUser(self):
        self.assertEqual(validateUser(self, "user123", "pass123"), 0)

    def test_createHardwareSet(self):
        self.assertEqual(createHardwareSet(self, "test hardware", 10), 0)

    def test_getHardwareSet(self):
        self.assertIsNone(getHardwareSet(self, "nonexist hardware"))

    def test_requestHardware(self):
        self.assertEqual(requestHardware(self, "test hardware", 5), 0)

    def test_returnHardware(self):
        self.assertEqual(returnHardware(self, "test hardware", 3), 0)

    def test_hardwareSetList(self):
        hardwares = hardwareSetList(self)
        self.assertIsInstance(hardwares, list)

    def test_removeHardware(self):
        self.assertEqual(removeHardware(self, "test hardware"), 0)

    def tearDown(self):
        # Reset or undo whatever you changed or initialized in setUp()
        pass

    @classmethod
    def tearDownClass(cls):
        # Clean up resources that were built in setUpClass()
        pass

if __name__ == '__main__':
    unittest.main()