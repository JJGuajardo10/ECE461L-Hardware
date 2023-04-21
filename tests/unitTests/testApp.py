import unittest
import app

class TestAPI(unittest.TestCase):

    def setUp(self):
        app.app.config['TESTING'] = True
        self.app = app.app.test_client()
    
    # test if index page loads
    def test_index(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    # test if error page loads
    def test_error(self):
        response = self.app.get('/error')
        self.assertEqual(response.status_code, 200)

    # test if metadata returns valid dictionary
    def test_metadata(self):
        # make a POST request to the route
        response = self.app.post('/metadataRequest',
                                 json={'datasetNum': 1})
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), dict)

    # test if verifyuser returns valid dictionary
    def test_verifyuser(self):
        # make a POST request to the route
        response = self.app.post('/verifyuser',
                                 json={'userid': 'testuser',
                                       'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), dict)
    
    # test if error occurs when removeuser is given invalid userid
    def test_removeuser(self):
        # make a POST request to the route
        response = self.app.post('/removeuser', json={'userid': 'testuser'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'errorcode': -1})

    # test if createuser is successful
    def test_createuser(self):
        # make a POST request to the route
        response = self.app.post('/createuser',
                                 json={'userid': 'testuser',
                                       'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'errorcode': 0})
    
if __name__ == '__main__':
    unittest.main()