# Palindrome Checker

This repository contains a simple Python module designed to check if a given string is a palindrome.

## `app.py`

The `app.py` file provides a single utility function for palindrome detection.

### Function Reference

#### `palindrome(s)`

Checks if a string is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backward as forward.

*   **Description:** This function takes a string `s` and determines whether it is a palindrome. It achieves this by comparing the original string with its reversed version.

*   **Parameters:**
    *   `s` (str): The input string to be checked.

*   **Returns:**
    *   `bool`: `True` if the string `s` is a palindrome, `False` otherwise.

*   **Example Usage:**

    ```python
    from app import palindrome

    # Example 1: Palindrome
    print(palindrome("madam"))
    # Expected output: True

    # Example 2: Not a palindrome
    print(palindrome("hello"))
    # Expected output: False

    # Example 3: Empty string (is considered a palindrome)
    print(palindrome(""))
    # Expected output: True

    # Example 4: Single character string (is considered a palindrome)
    print(palindrome("a"))
    # Expected output: True
    ```