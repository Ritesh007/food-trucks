import unittest
from app import app

class FoodTruckApiTest(unittest.TestCase):

    def setUp(self):
        # Set up the test client and enable testing mode before each test method
        self.app = app.test_client()
        self.app.testing = True

    def test_index(self):
        # Test the root URL to ensure the index page loads successfully
        result = self.app.get('/')
        self.assertEqual(result.status_code, 200)

    def test_get_food_trucks(self):
        # Test the /api/food-trucks/list endpoint to ensure it returns a list of food trucks
        result = self.app.get('/api/food-trucks/list')
        self.assertEqual(result.status_code, 200)
        self.assertIsInstance(result.json, list)

    def test_get_food_truck_by_zipcode(self):
        # Test the /api/food-trucks/<zipcode> endpoint to ensure it returns the correct food truck data or a 404 error
        result = self.app.get('/api/food-trucks/list?Zip_Codes=310.0')
        self.assertIn(result.status_code, [200, 404])
        if result.status_code == 200:
            self.assertIsInstance(result.json, list)
        elif result.status_code == 404:
            self.assertEqual(result.json['error'], 'Food truck not found')

if __name__ == '__main__':
    # Run the unit tests
    unittest.main()
