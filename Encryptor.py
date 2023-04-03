class Encryption:
    
    def __init__(self, N, D):
        self.__N = N
        self.__D = D

    def encrypt(self, inputText):
        reversedText = inputText[::-1]
        alteredText = []
        alteredString = ''
        for character in reversedText:
            intforChar = (ord(character)-34+self.__N*self.__D)%93 +34
            if (intforChar < 0):
                intforChar += 126
            else:    
                charToAdd = chr(intforChar)
                alteredText.append(charToAdd)
        
    
        
        for character in alteredText:
            alteredString+=character
    
        return alteredString
    
    def decrypt(self,inputText):
        reversedText = inputText[::-1]
        alteredText = []
        alteredString = ''
        for character in reversedText:
            intforChar = (ord(character)-34+self.__N*-self.__D)%93 +34
            if (intforChar < 0):
                intforChar += 126
            else:    
                charToAdd = chr(intforChar)
                alteredText.append(charToAdd)
        
    
        
        for character in alteredText:
            alteredString+=character
    
        return alteredString
