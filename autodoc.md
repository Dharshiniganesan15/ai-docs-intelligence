# Python Utilities

This repository contains a collection of utility functions and a simple calculator class implemented in Python.

## `app.py`

This file defines a set of standalone functions and a `Calculator` class to perform basic arithmetic operations and maintain a history of calculations.

### Functions

#### `hello_world()`

A simple function that prints "Hello, World!" to the console and returns the same string.

**Returns:**
`str`: The string "Hello, World!".

**Example Usage:**

```python
from app import hello_world

message = hello_world()
print(message)
# Expected console output:
# Hello, World!
# Expected return value: "Hello, World!"
```

#### `calculate_sum(a, b)`

Calculates the sum of two numbers.

**Parameters:**
*   `a`: The first number.
*   `b`: The second number.

**Returns:**
The sum of `a` and `b`.

**Example Usage:**

```python
from app import calculate_sum

result = calculate_sum(10, 5)
print(result)
# Expected output: 15
```

#### `multiply(a, b)`

Multiplies two numbers.

**Parameters:**
*   `a`: The first number.
*   `b`: The second number.

**Returns:**
The product of `a` and `b`.

**Example Usage:**

```python
from app import multiply

product = multiply(4, 7)
print(product)
# Expected output: 28
```

### Class `Calculator`

A simple calculator class designed to perform addition and maintain a history of performed `add` operations.

#### Constructor: `__init__(self)`

Initializes a new `Calculator` instance. It sets up an empty list `history` to store the records of additions.

**Example Usage:**

```python
from app import Calculator

my_calculator = Calculator()
```

#### Method: `add(self, a, b)`

Adds two numbers and records the operation (including inputs and result) into the calculator's `history`.

**Parameters:**
*   `a`: The first number to add.
*   `b`: The second number to add.

**Returns:**
The sum of `a` and `b`.

**Example Usage:**

```python
from app import Calculator

my_calculator = Calculator()
sum1 = my_calculator.add(20, 15)
print(f"First sum: {sum1}")
# Expected output: First sum: 35

sum2 = my_calculator.add(-10, 3)
print(f"Second sum: {sum2}")
# Expected output: Second sum: -7
```

#### Method: `get_history(self)`

Retrieves the list of all recorded addition operations performed by this `Calculator` instance. Each entry in the history is a formatted string.

**Returns:**
`list` of `str`: A list where each string represents an addition operation (e.g., `"20 + 15 = 35"`).

**Example Usage:**

```python
from app import Calculator

my_calculator = Calculator()
my_calculator.add(5, 5)
my_calculator.add(10, 20)
my_calculator.add(1, 2)

history_records = my_calculator.get_history()
print(history_records)
# Expected output: ['5 + 5 = 10', '10 + 20 = 30', '1 + 2 = 3']
```