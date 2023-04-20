import unittest

class TestEncryption(unittest.TestCase):

    def test_encrypt_and_decrypt(self):
        # Initialize Encryption object with N=5 and D=7
        encryption = Encryption(5, 7)
    
        # Define test input and expected output
        inputText = "Hello, world!"
        expected = "quT#h^O!]H(S.:"
    
        # Test encryption
        encrypted = encryption.encrypt(inputText)
        self.assertEqual(encrypted, expected)
    
        # Test decryption
        decrypted = encryption.decrypt(encrypted)
        self.assertEqual(decrypted, inputText)