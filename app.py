def hello_world():
    """A simple hello world function."""
    print("Hello, World!")
    return "Hello, World!"

def calculate_sum(a, b):
    """Calculate the sum of two numbers."""
    return a + b

class Calculator:
    """A simple calculator class."""
    
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        """Add two numbers and store in history."""
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def get_history(self):
        """Get calculation history."""
        return self.history
